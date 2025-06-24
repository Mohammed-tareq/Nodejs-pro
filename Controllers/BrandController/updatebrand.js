import expressAsyncHandler from "express-async-handler";
import AppError from "../../Utils/AppError.js";
import slugify from "slugify";
import Brand from "../../Models/brand.js";



const UpdateBrand = expressAsyncHandler ( async (req , res , next)=>{
    const {id} = req.params;
    const {body} = req;
    if(!body.name) next(new AppError(400, "Name is Require"));

    const brand = await Brand.findOneAndUpdate({_id:id},{
        name:body.name,
        slug:slugify(body.name),
        image:body.image
    },{new:true});

    if(!brand) next(new AppError(404 , "Brand Not Found"));

    res.status(200).json({
        status:"Success",
        message:"Brand Updated",
        data:brand
    })


})


export default UpdateBrand;