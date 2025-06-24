import SubCategory from "../../Models/subCategory.js";
import AppError from "../../Utils/AppError.js";
import slugify from "slugify";
import expressAsyncHandler from "express-async-handler";


 export const setCategoryIdFormBody = (req, res, next) => {
    if(!req.body.category){
        req.body.category = req.params.categoryId;
    }
    next();
}
const addSubCategory = expressAsyncHandler(async (req, res, next) => {
    const {body} = req;
    // if(req.params.categoryId) body.category = req.params.categoryId;
    if(!body.name || !body.category){
        return next(new AppError(400, "Name and Category is required"))
    }
    let  subCategory = await SubCategory.create({
        name: body.name,
        slug: slugify(body.name),
        category: body.category
    })
    if(!subCategory){
        return next(new AppError(400, "SubCategory not added"));
    }
     subCategory = await subCategory.populate({
        path: 'category',
         select: 'name -_id'
     })




    res.status(201).json({
        status: "success",
        message: "SubCategory added successfully",
        data: subCategory
    })
})

export default addSubCategory;