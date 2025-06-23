import AppErorr from "../Utils/AppErorr.js";

export default(err, req,res,next) =>{

    console.log(err.stack);
    if(err instanceof AppErorr) {
        return res.status(err.status).json({
            status:"Failed",
            message : err.message
        })
    }
}