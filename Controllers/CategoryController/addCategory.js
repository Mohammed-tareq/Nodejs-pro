import AppError from "../../Utils/AppError.js";
import Category from "../../Models/category.js";
import slugify from "slugify";
import expressAsyncHandler from "express-async-handler";


const addCategory = expressAsyncHandler(async (req, res) => {

    const { body } = req
    if (!body.name) {
        throw new AppError(400, 'name is required')
    }

    const category = await Category.create({
        name: body.name,
        slug: slugify(body.name),
        image: body.image
    })
    if (!category) {
        throw new AppError(400, 'category not added')
    }
    res.status(201).json({
        status: "success",
        message: "category added successfully",
        data: category

    })
})


export default addCategory;