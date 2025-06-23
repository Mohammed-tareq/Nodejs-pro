import expressAsyncHandler from "express-async-handler";
import Category from "../../Models/category.js";
import AppError from "../../Utils/AppError.js";





const deleteCategory = expressAsyncHandler(async (req, res,next) => {

    const {id} = req.params;

    const category = await Category.findOneAndDelete({_id:id});

    if(!Category){
        return  next( new  AppError(404,"Category not found"));
    }

    res.status(200).json({
        status:"success",
        message: "Category deleted successfully",
    })
})

export default deleteCategory;