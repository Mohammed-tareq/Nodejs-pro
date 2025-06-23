import AppError from "../Utils/AppError.js";
import mongoose from "mongoose";

export default (err, req, res, next) => {

    console.log(err.stack);
    if (err instanceof AppError) {
        return res.status(err.status).json({
            status: "Failed",
            message: err.message
        })
    }


    if (err.code === "11000" || err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
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
}