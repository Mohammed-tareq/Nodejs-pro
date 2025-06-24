import SubCategory from '../../Models/subCategory.js';
import AppError from '../../Utils/AppError.js';
import expressAsyncHandler from "express-async-handler";

export  const createFilterObject = (req, res, next) => {
    let  filterObject = {};
    if (req.params.categoryId) filterObject = { category: req.params.categoryId };
    req.filterObject = filterObject;
    next();
}
const getSubCategories = expressAsyncHandler(async (req, res, next) => {
    const {categoryId} = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const subCategories = await SubCategory.find(req.filterObject).skip(skip).limit(limit);
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