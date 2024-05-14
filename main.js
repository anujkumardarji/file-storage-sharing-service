const express = require("express")
const app = express()
const PORT = 4100
app.listen(PORT,()=>{
    console.log("Server is running")
})

app.get("/",(req,res)=>{
    res.send("This is root route")    
})

