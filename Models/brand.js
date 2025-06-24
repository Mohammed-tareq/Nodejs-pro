import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:[3, "Too Short Brnad Name "]
    }
})