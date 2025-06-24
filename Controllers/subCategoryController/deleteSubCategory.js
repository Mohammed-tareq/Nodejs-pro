import AppError from "../../Utils/AppError.js";
import expressAsyncHandler from "express-async-handler";
import SubCategory from "../../Models/subCategory.js";



const deleteSubCategory = expressAsyncHandler(async (req, res, next) => {

    const {id} = req.params;

    const subCategory = await SubCategory.findOneAndDelete({_id:id});

    if(!subCategory){
        return  next( new  AppError(404,"SubCategory not found"));
    }

    res.status(200).json({
        status:"success",
        message: "SubCategory deleted successfully",
    })
});


export default deleteSubCategory;
