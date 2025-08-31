import bcrypt from "bcryptjs"
import User from "../models/user.models.js";
import crypto from "crypto";
import sendingEmail from "../utils/sendingEmail.js";



const registerUser = async (req, res) => {

    const {email,name,password} = req.body;

    if(!email || !name || !password){
        return res.status(401).json({
            message:"All fields are required",
            success: false
        });
    }

    try{
        const alreadyRegisteredUser = await User.findOne({email});
       if(alreadyRegisteredUser){
           return res.status(400).json({
               message:"User already registered",
               success: false
           });
       }

       const token = crypto.randomBytes(30).toString("hex");

       console.log("Token:", token);

       const hashPassword = await bcrypt.hash(password,10);

       const newUser = await User.create({
        name,
        email,
        password:hashPassword,
        emailVerificationToken:token,
        emailVerificationExpires:Date.now()+60*60*1000,


       });
       if(!newUser){
        return res.status(401).json({
               message:"User not registered",
               success: false,
           });
       }

    //    Sending email for verification

    const options={
    email:email,
    subject:"Email Verification",
    route:"verify",
    token:token,

};
    await sendingEmail(options);

    return res.status(201).json({
        message:"User registered successfully",
        success: true,
        user:newUser,
    });
}
    catch(error){
        console.log("Internal Server error:",error)
        return res.status(500).json({
            message:"Internal Server error",
            success: false,
            error:error.message
        });
    }

};

const isVerify = async (req,res)=>{
try{
  const {token} = req.params;

  if(!token){
    return res.status(400).json({
      message:"Token is required",
      success: false
    });
  }


  const user = await User.findOne({emailVerificationToken:token}).select("-password");
  if(!user || user.emailVerificationExpires < Date.now()){
    return res.status(401).json({
      message:"Invalid token or token expired",
      success: false
    });
  }

  user.isVerified = true;
  user.emailVerificationExpires = undefined;
  user.emailVerificationToken = undefined;

  await user.save();
   return res.status(201).json({
        message:"Email verification successfully",
        success: true,
        user:user,
    });

  user.emailVerificationToken = undefined;
  await user.save();

  return res.status(200).json({
    message:"Email verified successfully",
    success: true
  });
}
catch(error){
     console.log("Internal Server error:",error)
        return res.status(500).json({
            message:"Internal Server error",
            success: false,
            error:error.message
        });

}

}

const loginUser = async (req, res) => {

    const {email,name,password} = req.body;

    if(!email || !password){
        return res.status(401).json({
            message:"All fields are required",
            success: false
        });
    }
    try{
      const user = await User.findOne({email});
      if(!user){
        return res.status(404).json({
          message:"User not found",
          success: false
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
        return res.status(401).json({
          message:"Invalid email or password",
          success: false
        });
      }

      return res.status(200).json({
        message:"Login successful",
        success: true,
        user:user
      });
    }
    catch(error){
        console.log("Internal Server error:",error)
        return res.status(500).json({
            message:"Internal Server error",
            success: false,
            error:error.message
        });
    }
}


const logoutUser = async (req, res) => {

    const {email,name,password} = req.body;
}

export { registerUser, loginUser, logoutUser, isVerify };


