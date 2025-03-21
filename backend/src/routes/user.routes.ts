import { Router, Request, Response } from "express";
import { User } from "../types/user";
import userController from "../controllers/user.controller";

const userRouter = Router()

userRouter.get("/users", userController.getUsers)
userRouter.post("/signup",(req:Request<{}, {}, Omit<User, "id" | "rate">>, res:Response) => {
    userController.createUser(req, res)
})
userRouter.post("/login", (req:Request<{}, {}, Omit<User, 'id' | 'rate'>>, res:Response) => {
    userController.loginUser(req, res)
})
userRouter.put("/edit/:id", (req: Request<{ id: string }, {}, Partial<User>>, res: Response) => {
    userController.editUserById(req, res)
})

export default userRouter