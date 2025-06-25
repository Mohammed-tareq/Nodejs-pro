import expressAsyncHandler from "express-async-handler";
import AppError from "../../Utils/AppError.js";
import slugify from "slugify";
import Product from "../../Models/product.js";


const UpdateProduct = expressAsyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const {body} = req;
    if (body.title) {
        body.slug = slugify(body.title)
    }


    const product = await Product.findOneAndUpdate({_id: id}, body, {new: true}).populate({
        path: "category",
        select: "name -_id"
    });

    if (!product) next(new AppError(404, "product Not Found"));

    res.status(200).json({
        status: "Success",
        message: "product Updated",
        data: product
    })


})


export default UpdateProduct;
