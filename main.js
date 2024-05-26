const express = require("express")
const bodyParser = require('body-parser')
const AWS = require("aws-sdk")
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;

// File helper middleware 
const multer = require('multer');

// DB Connection 
mongoose.connect(process.env.DB);
const db = mongoose.connection;


const app = express()
const PORT = 4100

app.use(bodyParser.json())
app.use(cors())

app.listen(PORT,()=>{
    console.log("Server is running")
})

app.get("/",(req,res)=>{
    res.send("This is root route")    
})

//Schema 
// Define a schema for storing file keys
const fileSchema = new Schema({
  key: String
});
const FileModel = mongoose.model('files', fileSchema);

// Configure AWS SDK
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
  });


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



app.post("/file-upload",upload.single('file'),async (req,res)=>{
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${Date.now()}_${path.basename(req.file.originalname)}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
    }
    
    try {
      await s3.upload(params).promise();
      const file = new FileModel({ key: params.Key });
      await file.save();
      res.send({ success : true, message : `File uploaded successfully.`, key : params.Key});
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to upload file to S3.');
    }
})

app.get("/download/:id",upload.single('file'),async (req,res)=>{
    const key = req.params.id;
    try {

      const file = await FileModel.findOne({ key : key });
      if (!file) {
        return res.status(404).send('File not found.');
      }
      // Retrieve the file from S3
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: file.key
      };
  
      const data = await s3.getObject(params).promise();
  
      res.setHeader('Content-Disposition', `attachment; filename="${key}"`);
      res.setHeader('Content-Type', data.ContentType);
  
      res.send(data.Body);
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to download file.');
    }
})

