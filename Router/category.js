import { Router } from "express";
import categoryIndex from "../Controllers/CategoryController/categoryIndex.js";

const categoryRouter = Router();

// categoryRouter.post("/" , categoryIndex.addCategory);
// categoryRouter.get("/" , categoryIndex.getCategories);
// or DRY
categoryRouter.route("/").post(categoryIndex.addCategory).get(categoryIndex.getCategories);

export default categoryRouter;