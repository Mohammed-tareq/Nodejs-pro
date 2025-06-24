import AppError from "../../Utils/AppError.js";
import expressAsyncHandler from "express-async-handler";
import Brand from "../../Models/brand.js";





const getAllBrands = expressAsyncHandler( async (req,res,next)=>{

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const skip = (page - 1) * limit ; 

    const brand = await Brand.find().skip(skip).limit(limit);

    if(brand.length === 0) next(new AppError(404 , "No Brands Found"));


    res.status(200).json({
        status:"Success",
        message:"Get All Brands",
        data : brand
    })
})  


export default getAllBrands;