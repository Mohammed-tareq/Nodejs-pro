import Category from "../../Models/category.js";
import AppErorr from "../../Utils/AppErorr.js";


const getCategories = async (req, res,next) =>{
    try{

        const categories = await Category.find().select("__v");
        if(!categories){
            throw new AppErorr(404, "No Categories Found");
        }
        res.status(200).json({
            status: "success",
            message:"Get All Categories",
            data: categories
        });

    }catch(err){
        console.log ("form get Categories")
        next(err)
    }
}

export default getCategories;
