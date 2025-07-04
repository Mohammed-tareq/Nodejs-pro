import mongoose from "mongoose";



const userSchema = new mongoose.Schema({ name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
},
email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
},
password: {
    type: String,
    required: true,
}
}, {timestamps: true});


userSchema.index({ email: 1 }, { unique: true });


const User  =  mongoose.model("User" , userSchema);


export default User;


