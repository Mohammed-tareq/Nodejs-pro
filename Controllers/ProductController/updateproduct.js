import expressAsyncHandler from "express-async-handler";
import AppError from "../../Utils/AppError.js";
import slugify from "slugify";
import Product from "../../Models/product.js";


const UpdateProduct = expressAsyncHandler ( async (req , res , next)=>{
    const {id} = req.params;
    const {body} = req;
    body.slug = slugify(body.title)
    if (!body.title ) {
        return next(new AppError(400, "Title required fields must be provided"));
      }
    

    const product = await Product.findOneAndUpdate({_id:id},body,{new:true});

    if(!product) next(new AppError(404 , "product Not Found"));

    res.status(200).json({
        status:"Success",
        message:"Brand Updated",
        data:product
    })


})


export default UpdateProduct;
