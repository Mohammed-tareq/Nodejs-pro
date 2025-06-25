import {check}  from "express-validator";
import validatorMiddleware from "../../Middlewares/validatorMiddleware.js";

const getCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid Category Id format"),
    validatorMiddleware
]

const createCategoryValidator = [
    check("name")
        .notEmpty().withMessage("Category name is required")
        .isLength({min:3}).withMessage("Category name must be at least 3 characters")
        .isLength({max:20}).withMessage("Category name must be less than 30 characters"),

    validatorMiddleware
];
const updateCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid Category Id format"),
    validatorMiddleware
]

const deleteCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid Category Id format"),
    validatorMiddleware
]

export {
getCategoryValidator,
createCategoryValidator,
updateCategoryValidator,
deleteCategoryValidator
}

