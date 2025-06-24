import expressAsyncHandler from "express-async-handler";
import slugify from "slugify";
import Brand from "../../Models/brand.js";
import AppError from './../../Utils/AppError.js';




const addBrand  = expressAsyncHandler(async (req,res,next)=>{

    const {body} = req;
    if(!body.name) next(new AppError(400 ,  "Name Is Require"));

    const brand = await Brand.create({
        name:body.name,
        slug : slugify(body.name),
        image:body.image

    })

    if(!brand) next(new AppError(400, "Brand Not Added"));

    res.status(201).json({
        status:"success",
        massage: "Brand Added Successfully",
        data: brand
    })


})

export default addBrand;
