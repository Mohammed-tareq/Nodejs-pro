import { Router } from "express";
import categoryIndex from "../Controllers/CategoryController/categoryIndex.js";

const categoryRouter = Router();

// categoryRouter.post("/" , categoryIndex.addCategory);
// categoryRouter.get("/" , categoryIndex.getCategories);
// or DRY
categoryRouter.route("/").get(categoryIndex.getCategories).post(categoryIndex.addCategory);

export default categoryRouter;