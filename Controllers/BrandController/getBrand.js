import AppError from "../../Utils/AppError.js";
import expressAsyncHandler from "express-async-handler";
import Brand from "../../Models/brand.js";





const getBrnad = expressAsyncHandler ( async (req , res , next)=>{
    const {id} = req.params;


    const brand = await Brand.findOne({_id:id});
    if(!brand) next(new AppError(404 , "Brand Not Found "));

    res.status(200).json({
        status:"Success",
        message:"Get Single Brand",
        data:brand
    })


})

export default getBrnad;