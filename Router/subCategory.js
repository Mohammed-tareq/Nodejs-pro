import {Router} from 'express';
import subCategoryIndex from '../Controllers/subCategoryController/subCategoryIndex.js';
import {addSubCategoryValidator,getSubCategoryValidator,updateSubCategoryValidator,deleteSubCategoryValidator } from '../Utils/Validators/subCategoryValidator.js';
import {setCategoryIdFormBody} from "../Controllers/subCategoryController/addSubcategory.js";
import {createFilterObject} from "../Controllers/subCategoryController/getSubCategories.js";

const subCategoryRouter = Router({mergeParams:true});


subCategoryRouter.route("/")
    .get(createFilterObject,subCategoryIndex.getSubCategories)
    .post(setCategoryIdFormBody,addSubCategoryValidator,subCategoryIndex.addSubCategory);

subCategoryRouter.route("/:id")
    .get(getSubCategoryValidator,subCategoryIndex.getSubCategory)
    .put(updateSubCategoryValidator,subCategoryIndex.updateSubCategory)
    .delete(deleteSubCategoryValidator,subCategoryIndex.deleteSubCategory);


export default subCategoryRouter;