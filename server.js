import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./DataBase/connectDB.js";
import errorHandel from "./Middlewares/errorHandel.js";
import categoryRouter from "./Router/category.js";
import subCategoryRouter from "./Router/subCategory.js";
import brandRouter from "./Router/brand.js";
import AppError from "./Utils/AppError.js";
import productRouter from "./Router/product.js";
const app = express();
app.use(express.json());
dotenv.config();
const PORT  = process.env.PORT;
if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
    console.log(`you are in ${process.env.NODE_ENV} mode`)
}



app.use("/api/v1/category" , categoryRouter)
app.use("/api/v1/subCategory" , subCategoryRouter)
app.use("/api/v1/brand" , brandRouter)
app.use("/api/v1/product" , productRouter)


app.use((req,res,next)=>{
    next(new AppError(404,`can't find this route ${req.originalUrl}`));
})

app.use(errorHandel)

const server = app.listen(PORT,()=>{
    connectDB() // connect to database 
    console.log(`server is run in port ${PORT}`);
})


//  for any error out of server or express like  lose connection to database or different error in promise functions
process.on("unhandledRejection",(err,promise)=>{
    console.error(`unhandledRejection error : ${err.message}`);
    server.close(()=>{
        process.exit(1);
    })
})