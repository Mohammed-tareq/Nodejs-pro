import validatorMiddleware from "../Middlewares/validatorMiddleware.js";
import { check } from "express-validator";




const addSubCategoryValidator = [
    check("name").notEmpty().withMessage("Sub Category name is required")
        .isLength({min:3}).withMessage("Sub Category name must be at least 3 characters")
        .isLength({max:20}).withMessage("Sub Category name must be less than 30 characters"),
    check("category").isMongoId().withMessage("Invalid Category Id format"),
    validatorMiddleware
]

const getSubCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid Sub Category Id format"),
    validatorMiddleware
]

const updateSubCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid Sub Category Id format"),
    check("name").notEmpty().withMessage("Sub Category name is required"),

    validatorMiddleware
]

const deleteSubCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid Sub Category Id format"),
    validatorMiddleware
]

export {
    addSubCategoryValidator,
    getSubCategoryValidator,
    updateSubCategoryValidator,
    deleteSubCategoryValidator
}