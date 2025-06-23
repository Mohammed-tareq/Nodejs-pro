import AppErorr from "../Utils/AppErorr.js";
import mongoose from "mongoose";

export default (err, req, res, next) => {

    console.log(err.stack);
    if (err instanceof AppErorr) {
        return res.status(err.status).json({
            status: "Failed",
            message: err.message
        })
    }


    if (err.code === "11000" || err instanceof mongoose.mongo.MongoServerError && err.code === 11000  ) {
        return res.status(400).json({
            status: "Failed",
            message: `Duplicate entry ${Object.keys(err.keyValue)[0]}`
        })
    }
}