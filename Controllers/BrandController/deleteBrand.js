import AppError from "../../Utils/AppError.js";
import expressAsyncHandler from "express-async-handler";
import Brand from "../../Models/brand.js";


const deleteBrand = expressAsyncHandler( async (req , res , next)=>{
    const {id} = req.params;
    const brand = await Brand.findOneAndDelete({_id:id});

    if(!brand) next(new AppError(404 , "Brand Not Found"));

    res.status(200).json({
        status:"Success",
        message:"Brand Deleted Successfully",
    })
})

export default deleteBrand;