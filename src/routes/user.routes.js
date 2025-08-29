import { registerUser } from "../controllers/user.controllers.js";
import {Router} from 'express'

const userRouter =Router();

userRouter.post("/register",registerUser);

export default userRouter;
