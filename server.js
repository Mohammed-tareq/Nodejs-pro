import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./DataBase/connectDB.js";
import errorHandel from "./Middlewares/errorHandel.js";
import categoryRouter from "./Router/category.js";

const app = express();
dotenv.config();
const PORT  = process.env.PORT;
if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
    console.log(`you are in ${process.env.NODE_ENV} mode`)
}


// test route
app.get("/",(req,res)=>{
    res.send("Hello World");
})
app.use("/api/v1/category" , categoryRouter)



app.use(errorHandel)

app.listen(PORT,()=>{
    connectDB() // connect to database 
    console.log(`server is run in port ${PORT}`);
})