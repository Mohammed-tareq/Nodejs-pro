import AppError from "../../Utils/AppError.js";
import expressAsyncHandler from "express-async-handler";
import Product from './../../Models/product.js';





const getAllProducts = expressAsyncHandler( async (req,res,next)=>{

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const skip = (page - 1) * limit ; 

    const product = await Product.find().skip(skip).limit(limit).populate({path:"category", select:"name -_id"});

    if(product.length === 0){

        return next(new AppError(404 , "No products Found"));
    } 
        


    res.status(200).json({
        status:"Success",
        message:"Get All Brands",
        data : product
    })
})  


export default getAllProducts;