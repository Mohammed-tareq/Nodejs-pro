import { Router } from "express";
import brandIndex from "../Controllers/BrandController/brandIndex.js";
import {addBrandsValidator , getBrandValidtor , updateBrandValidtor , deleteBrandValidtor} from "../Utils/Validators/brandValidator.js"


const brandRouter = Router();



brandRouter.route("/")
.get(brandIndex.getAllBrands)
.post(addBrandsValidator,brandIndex.addBrand);


brandRouter.route("/:id")
.get(getBrandValidtor,brandIndex.getBrnad)
.put(updateBrandValidtor,brandIndex.UpdateBrand)
.delete(deleteBrandValidtor,brandIndex.deleteBrand);

export default brandRouter;