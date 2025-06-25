import expressAsyncHandler from "express-async-handler";
import slugify from "slugify";
import AppError from '../../Utils/AppError.js';
import Product from "../../Models/product.js";




const addproduct  = expressAsyncHandler(async (req,res,next)=>{

    const {body} = req;
    if (!body.title || !body.price || !body.quantity || !body.Category) {
        return next(new AppError(400, "All required fields must be provided"));
      }
    
    body.slug = slugify(body.title)
    const product = await Product.create(body)

    if(!product) next(new AppError(400, "Product Not Added"));

    res.status(201).json({
        status:"success",
        massage: "Brand Added Successfully",
        data: product
    })


})

export default addproduct;
