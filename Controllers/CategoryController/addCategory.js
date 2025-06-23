import AppErorr from "../../Utils/AppErorr.js";
import Category from "../../Models/category.js";
import filtesRes from "../../Utils/filterRes.js";



const addCategory = async (req, res, next) => {
    try {
        const { body} = req
        if (!body.name) {
            throw new AppErorr(400, 'name is required')
        }

        const category = await Category.create({ name: body.name })
        if (!category) {
            throw new AppErorr(400, 'category not added')
        }
        const categroyFilter = filtesRes(category.toObject(),["__v"])
        res.status(201).json({
            status: "success",
            message: "category added successfully",
            data: categroyFilter

        })

    } catch (err) {
        console.log("form add caregory")

        next(err)

    }
}


export default addCategory;