import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    },
    isVerified:{
        type:Boolean,
        default:false,
    },

    emailVerificationToken:String,
    emailVerificationExpires:Date,
    resetVerificationToken:String,
    resetVerificationExpires:Date,


},
{timestamps:true});

const User = mongoose.model("User",userSchema);

export default User;