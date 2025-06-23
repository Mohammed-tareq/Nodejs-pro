import { Router } from "express";
import categoryIndex from "../Controllers/CategoryController/categoryIndex.js";

const categoryRouter = Router();

categoryRouter.post("/" , categoryIndex.addCategory);

export default categoryRouter;