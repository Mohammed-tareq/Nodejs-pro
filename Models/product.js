import mongoose from "mongoose";
import Category from './category';




const productSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        require: true,
        minlength: [3, "Too Short Product Name"],
        maxlength: [25, "Too long Product Name"]
    },
    slug: {
        type: String,
        lowercase: true,
    },
    description: {
        type: String,
        require: [true, "Description Is Required"],
        trim: true,
        minlength: [20, "Too short Product Description"]
    },
    quantity: {
        type: Number,
        require: [true, " Quantity For Product Is Requied"],
    },
    sold: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        require: [true, "Price For product Is Required"],
        trim: true,
        max: [15, " Too Lang product Price  "]
    },
    priceAfterDiscount: {
        type: number
    },
    color: [String],
    imageCover: {
        type: String,
        require: [true, "Product Image Cover Is Required"]
    },
    images: [String],


    Category:{
        type:mongoose.Schema.ObjectId,
        ref:"Category",
        require:[true , "Product Must Be Long To Category"],
        trim:true
    },

    subcategory:{
        type:mongoose.Schema.ObjectId,
        ref:"SubCategory"
    },
    brand:{
        type:mongoose.Schema.ObjectId,
        ref:"Brand"
    },

    ratingAverage:{
        type : Number,
        min:[1 , "Rating Must be Above Or Equal 1.0"],
        max:[5,"Rating Must be Below Or Equal 5.5"],
    }, 

    ratingQuantity:{
        type: Number,
        default:0
    }

},{timestamps:true})


const Product = mongoose.model("Product" , productSchema);


export default Product;