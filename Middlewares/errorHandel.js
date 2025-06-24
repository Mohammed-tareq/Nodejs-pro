import AppError from "../Utils/AppError.js";
import mongoose from "mongoose";
import {param , validationResult} from "express-validator";

import dotenv from "dotenv";
dotenv.config();

export default (err, req, res, next) => {
    const isDev = process.env.NODE_ENV === "development";

    if (isDev && err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            isOperational: err.isOperational,
            stack: err.stack,
        })
    }

    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
    }

    if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
        return res.status(400).json({
            status: "Failed",
            message: `Duplicate entry ${Object.keys(err.keyValue)[0]}`
        })
    }



    if (err.name === "CastError") {
        return res.status(400).json({
            status: "Failed",
            message: `Invalid Input : ${err.value}`
        })
    }

    return res.status(500).json({
        status: err.status,
        message: "Internal Server Error",
    })

}




