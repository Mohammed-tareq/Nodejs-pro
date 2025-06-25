import { Router } from 'express';
import productIndex from '../Controllers/ProductController/productIndex.js';
import {addProductValidator , getProductValidator , updateProductValidator , deleteProductValidator} from '../Utils/Validators/productValidator.js'


const productRouter = Router();


productRouter.route('/')
.get(productIndex.getAllProducts)
.post(addProductValidator,productIndex.addproduct);


productRouter.route("/:id")
.get(getProductValidator,productIndex.getproduct)
.patch(updateProductValidator,productIndex.UpdateProduct)
.delete(deleteProductValidator,productIndex.deleteProduct);



export default productRouter;
