import SubCategory from '../../Models/subCategory.js';
import AppError from '../../Utils/AppError.js';
import expressAsyncHandler from "express-async-handler";


const getSubCategories = expressAsyncHandler(async (req, res, next) => {
    const {categoryId} = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const skip = (page - 1) * limit;
console.log(req.params);
    let  filterCategoryById = {};
    if (req.params.categoryId) filterCategoryById = { category: req.params.categoryId };



    const subCategories = await SubCategory.find(filterCategoryById).skip(skip).limit(limit);
        // .populate({
        //     path: 'category',
        //     select: 'name'
        // });
    if (subCategories.length === 0) {
        return next(new AppError(404, "No Sub Categories Found"));
    }

    res.status(200).json({
        status: "success",
        message: "Get All Sub Categories",
        result: subCategories.length,
        data: subCategories
    });
});

export default getSubCategories;