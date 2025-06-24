import  mongoose  from "mongoose";
import SubCategory from "../../Models/subCategory.js";
import AppError from "../../Utils/AppError.js";
import slugify from "slugify";
import expressAsyncHandler from "express-async-handler";

const addSubCategory = expressAsyncHandler(async (req, res, next) => {
    const {body} = req;
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
         select: 'name'
     })


    const response = {
        name: subCategory.name,
        slug: subCategory.slug,
        categoryName: subCategory.category.name,
        createdAt: subCategory.createdAt
    }

    res.status(201).json({
        status: "success",
        message: "SubCategory added successfully",
        data: response
    })
})

export default addSubCategory;