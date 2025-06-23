import AppError from "../../Utils/AppError.js";
import Category from "../../Models/category.js";
import expressAsyncHandler from "express-async-handler";



const getCategory = expressAsyncHandler(async (req, res)=>{
    const {id} = req.params;

    const category = await Category.findById(id);
    if(!category){
        throw new AppError(404, "Category Not Found By This Id : " + id);
    }
    res.status(200).json({
        status: "success",
        message: "Get Single Category",
        data: category
})
})
export default getCategory;