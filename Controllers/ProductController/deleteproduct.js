import AppError from "../../Utils/AppError.js";
import expressAsyncHandler from "express-async-handler";
import Product from "../../Models/product.js";

const deleteProduct = expressAsyncHandler( async (req , res , next)=>{
    const {id} = req.params;
    const product = await Product.findOneAndDelete({_id:id});

    if(!product) {
        return next(new AppError(404 , "product Not Found"));
    }

    res.status(200).json({
        status:"Success",
        message:"product  Deleted Successfully",
    })
})

export default deleteProduct;