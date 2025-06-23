import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


export default async function connectDB (){

    mongoose.connect(process.env.DB_URL)
    .then(() => console.log("connected to DB"))
    .catch(() => console.log ("failed to connect to DB"))
}