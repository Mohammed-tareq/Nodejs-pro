import validateMongoId from "../../Middlewares/validatorMiddleware.js";
import {check} from "express-validator";
import AppError from "../../Utils/appError.js";
import Category from "../../Models/category.js";
import SubCategory from "../../Models/subCategory.js";
import Brand from "../../Models/brand.js";


const addProductValidator = [
    check("title")
        .notEmpty().withMessage("Product name is required")
        .isLength({min: 3}).withMessage("Product name must be at least 3 characters"),
    check("description")
        .notEmpty().withMessage("Product description is required")
        .isLength({max: 350}).withMessage(" Too Long Product description must "),
    check("quantity")
        .notEmpty().withMessage("Product quantity is required")
        .isNumeric().withMessage("Product quantity must be a number"),
    check("price")
        .notEmpty().withMessage("Product price is required")
        .isNumeric().withMessage("Product price must be a number")
        .isLength({max: 15}).withMessage(" Too Long Product price must be less than 15 characters"),
    check("sold").isNumeric().withMessage("Product sold must be a number")
        .optional(),
    check("priceAfterDiscount").isNumeric().withMessage("Product priceAfterDiscount must be a number")
        .optional()
        .isLength({max: 15}).withMessage(" Too Long Product priceAfterDiscount must be less than 15 characters")
        .toFloat()
        .custom((value, {req}) => {
            if (value >= req.body.price) {
                throw new Error("Product priceAfterDiscount must be less than product price")
            }
            return true;
        }),
    check("colors").isArray().withMessage("Product colors must be an array")
        .optional(),
    check("imageCover").notEmpty().withMessage("Product imageCover must be a string"),
    check("images").isArray().withMessage("Product images must be an array")
        .optional(),
    check("category").isMongoId().withMessage("Invalid Category Id format")
        .notEmpty().withMessage("Product category is required")
        .custom((id) =>
            Category.findById(id).then((data) => {
                if (!data) {
                    return Promise.reject(new AppError(404, `this  Category not found`))
                }
            })),
    check("subCategory").isMongoId().withMessage("Invalid Sub Category Id format")
        .optional()
        .custom((id) =>
            SubCategory.find({_id: {$exists: true, $in: id}}).then((data) => {
                if (data.length < 1 || data.length !== id.length) {
                    return Promise.reject(new AppError(404, `this Sub Category not found`))
                }
            }))
        .custom((value , {req}) =>{
            SubCategory.find({category: req.body.category}).then((data) => {
                let subCategoriesDB = [];
              data.forEach((subCategory) => {
                  subCategoriesDB.push(subCategory._id.toString());
                });
                if(!value.every((id) => subCategoriesDB.includes(id))){
                    return Promise.reject(new AppError(404, `this Sub Category not belongs to this Category`))
                }
            })
}) ,
    check("brand").isMongoId().withMessage("Invalid Brand Id format")
        .optional()
        .custom((id) =>
            Brand.findById(id).then((data) => {
                if (!data) {
                    return Promise.reject(new AppError(404, `this Sub Category not found`))
                }
            })),
    check("ratingsAverage").isNumeric().withMessage("Product ratingsAverage must be a number")
        .optional()
        .isLength({max: 5}).withMessage(" Too Long Product ratingsAverage must be less than 5 characters"),
    check("ratingsQuantity").isNumeric().withMessage("Product ratingsQuantity must be a number")
        .optional(),

    validateMongoId
]

const getProductValidator = [
    check("id").isMongoId().withMessage("Invalid Product Id format"),
    validateMongoId
]

const updateProductValidator = [
    check("id").isMongoId().withMessage("Invalid Product Id format"),
    validateMongoId
]

const deleteProductValidator = [
    check("id").isMongoId().withMessage("Invalid Product Id format"),
    validateMongoId
]

export {
    addProductValidator,
    getProductValidator,
    updateProductValidator,
    deleteProductValidator
}