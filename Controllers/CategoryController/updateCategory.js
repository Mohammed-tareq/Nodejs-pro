import AppError from "../../Utils/AppError.js";
import expressAsyncHandler from "express-async-handler";
import Category from "../../Models/category.js";
import slugify  from "slugify";


const updateCategory = expressAsyncHandler(async (req, res, next) => {

    const {id} = req.params;
    const {body} = req;

    if(!body.name){
        return  next(new AppError(400, "Name is required"));
    }

    const category = await  Category.findOneAndUpdate({_id:id} , {
        name: body.name,
        slug: slugify(body.name),
    },{ new: true })
    if(!category){
        return  next(new AppError(404, "Category not found"));
    }


    res.status(200).json({
        status: "success",
        message: "Category updated",
        data: category
    });
})
 export default updateCategory;