import mongoose from "mongoose";


const categorySchma = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    }
},{timestamps:true})

categorySchma.index({ name: 1 }, { unique: true });


const Category = mongoose.model("Category" , categorySchma)


export default Category;