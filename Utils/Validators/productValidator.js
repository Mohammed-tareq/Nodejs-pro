import validateMongoId from "../../Middlewares/validatorMiddleware.js";
import { check } from "express-validator";
import AppError from "../../Utils/appError.js";
import Category from "../../Models/category.js";
import SubCategory from "../../Models/subCategory.js";
import Brand from "../../Models/brand.js";


const addProductValidator = [
  logValidator,
  check("title")
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 3 })
    .withMessage("Product name must be at least 3 characters"),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 350 })
    .withMessage(" Too Long Product description must "),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .isLength({ max: 15 })
    .withMessage(" Too Long Product price must be less than 15 characters"),
  check("sold")
    .isNumeric()
    .withMessage("Product sold must be a number")
    .optional(),
  check("priceAfterDiscount")
    .isNumeric()
    .withMessage("Product priceAfterDiscount must be a number")
    .optional()
    .isLength({ max: 15 })
    .withMessage(
      " Too Long Product priceAfterDiscount must be less than 15 characters"
    )
    .toFloat()
    .custom((value, { req }) => {
      if (value >= req.body.price) {
        throw new Error(
          "Product priceAfterDiscount must be less than product price"
        );
      }
      return true;
    }),
  check("colors")
    .isArray()
    .withMessage("Product colors must be an array")
    .optional(),
  check("imageCover")
    .notEmpty()
    .withMessage("Product imageCover must be a string"),
  check("images")
    .isArray()
    .withMessage("Product images must be an array")
    .optional(),
  check("category")
    .notEmpty()
    .withMessage("Product must be belong to a category")
    .isMongoId()
    .withMessage("Invalid ID formate")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category for this id: ${categoryId}`)
          );
        }
      })
    ),
  check("subcategories")
    .optional()
    .isArray()
    .withMessage("Subcategories must be an array of Mongo IDs")
    .custom((subcategoriesIds) =>
      SubCategory.find({ _id: { $exists: true, $in: subcategoriesIds } }).then(
        (result) => {
          if (result.length < 1 || result.length !== subcategoriesIds.length) {
            return Promise.reject(new Error(`Invalid subcategories Ids`));
          }
        }
      )
    )
    .custom((val, { req }) =>
      SubCategory.find({ category: req.body.category }).then(
        (subcategories) => {
          const subCategoriesIdsInDB = [];
          subcategories.forEach((subCategory) => {
            subCategoriesIdsInDB.push(subCategory._id.toString());
          });

          console.log(subCategoriesIdsInDB);
          const checker = (target, arr) => target.every((v) => arr.includes(v));
          if (!checker(val, subCategoriesIdsInDB)) {
            return Promise.reject(
              new Error(`subcategories not belong to category`)
            );
          }
        }
      )
    ),

  check("brand")
    .isMongoId()
    .withMessage("Invalid Brand Id format")
    .optional()
    .custom((id) =>
      Brand.findById(id).then((data) => {
        if (!data) {
          return Promise.reject(
            new AppError(404, `this Sub Category not found`)
          );
        }
      })
    ),
  check("ratingsAverage")
    .isNumeric()
    .withMessage("Product ratingsAverage must be a number")
    .optional()
    .isLength({ max: 5 })
    .withMessage(
      " Too Long Product ratingsAverage must be less than 5 characters"
    ),
  check("ratingsQuantity")
    .isNumeric()
    .withMessage("Product ratingsQuantity must be a number")
    .optional(),

  validateMongoId,
];

const getProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product Id format"),
  validateMongoId,
];

const updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product Id format"),
  validateMongoId,
];

const deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product Id format"),
  validateMongoId,
];

export {
  addProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
};
