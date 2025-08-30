import { registerUser, isVerify } from "../controllers/user.controllers.js";
import {Router} from 'express'

const userRouter =Router();

userRouter.post("/register",registerUser);
userRouter.get("/verify/:token",isVerify);

export default userRouter;
