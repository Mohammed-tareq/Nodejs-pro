import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

const app = express();
dotenv.config();
const PORT  = process.env.PORT;
if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
    console.log(`you are in ${process.env.NODE_ENV} mode`)
}


app.get("/",(req,res)=>{
    res.send("Hello World");
})


app.listen(PORT,()=>{
    console.log(`server is run in port ${PORT}`);
})