import {Router} from "express";
import categoryIndex from "../Controllers/CategoryController/categoryIndex.js";
import {
    getCategoryValidator,
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator
} from "../Utils/Validators/categoryValidator.js";
import subCategoryRouter from "./subCategory.js";

const categoryRouter = Router();

// categoryRouter.post("/" , categoryIndex.addCategory);
// categoryRouter.get("/" , categoryIndex.getCategories);
// or DRY
categoryRouter.route("/").get(categoryIndex.getCategories).post(createCategoryValidator, categoryIndex.addCategory);

categoryRouter.route("/:id").get(getCategoryValidator, categoryIndex.getCategory).put(updateCategoryValidator, categoryIndex.updateCategory).delete(deleteCategoryValidator, categoryIndex.deleteCategory);

categoryRouter.use("/:categoryId/subCategory", subCategoryRouter);

export default categoryRouter;