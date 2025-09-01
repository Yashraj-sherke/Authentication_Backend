import { registerUser, isVerify } from "../controllers/user.controllers.js";
import {Router} from 'express'
import { loginUser } from "../controllers/user.controllers.js";

const userRouter =Router();

userRouter.post("/register",registerUser);
userRouter.get("/verify/:token",isVerify);
userRouter.post("/login",loginUser);

export default userRouter;
