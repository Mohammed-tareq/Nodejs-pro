import AppError from "../../Utils/AppError.js";
import expressAsyncHandler from "express-async-handler";
import Product from "../../Models/product.js";




const getproduct = expressAsyncHandler ( async (req , res , next)=>{
    const {id} = req.params;


    const product = await Product.findOne({_id:id}).populate({path:"category",select:"name -_id"});
    if(!product){
        return next(new AppError(404 , "Product Not Found "));
    } 

    res.status(200).json({
        status:"Success",
        message:"Get Single Brand",
        data:product
    })


})

export default getproduct;