import {Router} from 'express';
import subCategoryIndex from '../Controllers/subCategoryController/subCategoryIndex.js';
import {addSubCategoryValidator,getSubCategoryValidator,updateSubCategoryValidator,deleteSubCategoryValidator } from '../Utils/subCategoryValidator.js';

const subCategoryRouter = Router({ mergeParams: true });

// Debug middleware to log when subCategoryRouter is hit
subCategoryRouter.use((req, res, next) => {
  console.log("subCategoryRouter hit:", req.method, req.originalUrl);
  next();
});

subCategoryRouter.route("/")
    .get(subCategoryIndex.getSubCategories)
    .post(addSubCategoryValidator,subCategoryIndex.addSubCategory);

subCategoryRouter.route("/:id")
    .get(getSubCategoryValidator,subCategoryIndex.getSubCategory)
    .put(updateSubCategoryValidator,subCategoryIndex.updateSubCategory)
    .delete(deleteSubCategoryValidator,subCategoryIndex.deleteSubCategory);


export default subCategoryRouter;