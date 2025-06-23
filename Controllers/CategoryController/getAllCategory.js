import Category from "../../Models/category.js";
import AppError from "../../Utils/AppError.js";
import expressAsyncHandler from "express-async-handler";

const getCategories = expressAsyncHandler(async (req, res, next) => {


    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const categories = await Category.find().skip(skip).limit(limit);
    if (!categories) {
        return next(new AppError(404, "No Categories Found"));
    }

    res.status(200).json({
        status: "success",
        message: "Get All Categories",
        result: categories.length,
        data: categories
    });


})

export default getCategories;
