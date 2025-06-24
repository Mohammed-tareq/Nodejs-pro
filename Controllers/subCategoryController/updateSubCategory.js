import AppError from "../../Utils/AppError.js";
import expressAsyncHandler from "express-async-handler";
import SubCategory from "../../Models/subCategory.js";
import slugify from "slugify";

const updateSubCategory = expressAsyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const {body} = req;
    console.log(body);
    if(!body.name ){
        return  next(new AppError(400, "Name and Category is required"));
    }

    const subCategory = await SubCategory.findOneAndUpdate({_id:id} , {
        name: body.name,
        slug: slugify(body.name),
        category: body.category
    },{ new: true })
    if(!subCategory){
        return  next(new AppError(404, "SubCategory not found"));
    }
    res.status(200).json({
        status: "success",
        message: "SubCategory updated",
        data: subCategory
    });
})

export default updateSubCategory