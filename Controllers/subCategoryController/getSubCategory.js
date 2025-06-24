import AppError from "../../Utils/AppError.js";
import expressAsyncHandler from "express-async-handler";
import SubCategory from "../../Models/subCategory.js";

const getSubCategory = expressAsyncHandler(async (req, res, next) => {
    const {id} = req.params;

    const subCategory = await SubCategory.findOne({_id:id});
    if(!subCategory){
        return next(new AppError(404, "SubCategory Not Found By This Id : " + id));
    }
    res.status(200).json({
        status: "success",
        message: "Get Single SubCategory",
        data: subCategory
    })
})

export default getSubCategory