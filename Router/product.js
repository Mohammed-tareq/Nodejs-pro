import { Router } from 'express';
import productIndex from '../Controllers/ProductController/productIndex.js';


const productRouter = Router();







productRouter.route('/')
.get(productIndex.getAllproducts)
.post(productIndex.addproduct);


productRouter.route("/:id")
.get(productIndex.getproduct)
.patch(productIndex.UpdateProduct)
.delete(productIndex.deleteProduct);










export default productRouter;
