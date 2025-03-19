import { Sign } from "crypto";
import { Request, Response } from "express";


const home = (req: Request, res: Response) => {
    res.status(200).send("HomePage")
}
const signup = (req: Request, res: Response) => {
    res.status(200).send("SignupPage")
}

export default {
    home,
    signup   
}