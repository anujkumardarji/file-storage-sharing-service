const express = require("express")
const bodyParser = require('body-parser')
const AWS = require("aws-sdk")
const path = require('path');
require('dotenv').config();
// Storage 
const multer = require('multer');


const app = express()
const PORT = 4100

app.use(bodyParser.json())


app.listen(PORT,()=>{
    console.log("Server is running")
})

app.get("/",(req,res)=>{
    res.send("This is root route")    
})


// Configure AWS SDK
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
  });


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



app.post("/file-upload",upload.single('file'),(req,res)=>{
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${Date.now()}_${path.basename(req.file.originalname)}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
    }
    
    s3.upload(params, (error, data) => {
        if (error) { 
          console.error(error);
          return res.status(500).send('Failed to upload file to S3.');
        }
        res.send(`File uploaded successfully. S3 URL: ${data.Location}`);
      });;
})

app.get("/download/:id",upload.single('file'),(req,res)=>{
    const key = req.params.id;
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key
    };
    s3.getObject(params, (error, data) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Failed to download file from S3.');
      }

      // Set headers for the downloadable file
      res.setHeader('Content-Disposition', `attachment; filename="${key}"`);
      res.setHeader('Content-Type', data.ContentType);

      // Send the file data as the response
      res.send(data.Body);
    });
})

