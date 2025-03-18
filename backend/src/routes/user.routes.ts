import { Router } from "express";
import userController from "../controllers/user.controller";

const userRouter = Router()

userRouter.post("/signup", userController.createUser)
userRouter.get("/users", userController.getUsers)


export default userRouter