import expressAsyncHandler from "express-async-handler";
import slugify from "slugify";
import AppError from '../../Utils/AppError.js';
import Product from "../../Models/product.js";




const addproduct  = expressAsyncHandler(async (req,res,next)=>{

    const {body} = req;
    if (!body.title || !body.price || !body.quantity || !body.category) {
        return next(new AppError(400, "All required fields must be provided"));
      }
    
    body.slug = slugify(body.title)
    const product = await Product.create(body);

    await product.populate([
        {
            path: "category",
            select: "name -_id"
        },
        {
            path: "subcategory",
            select: "name -_id"
        },
        {
            path: "brand",
            select: "name -_id"
        }
    ]);
    if(!product) next(new AppError(400, "Product Not Added"));

    res.status(201).json({
        status:"success",
        massage: "Product Added Successfully",
        data: product
    })


})

export default addproduct;
