import AppErorr from "../../Utils/AppErorr.js";
import Category from "../../Models/category.js";
import filtesRes from "../../Utils/filterRes.js";
import slugify from "slugify";


const addCategory = async (req, res, next) => {
    try {
        const { body } = req
        if (!body.name) {
            throw new AppErorr(400, 'name is required')
        }

        const category = await Category.create({
            name: body.name,
            slug:slugify( body.name),
            image: body.image
        })
        if (!category) {
            throw new AppErorr(400, 'category not added')
        }
        res.status(201).json({
            status: "success",
            message: "category added successfully",
            data: category

        })

    } catch (err) {
        console.log("form add caregory")

        next(err)

    }
}


export default addCategory;