import express from "express";
import env from "dotenv";

env.config();
const app = express();
const port  = process.env.PORT;

app.get("/",(req,res)=>{
    res.send("Hello World");
})


app.listen(8000,()=>{
    console.log("server is running on port 8000");
})