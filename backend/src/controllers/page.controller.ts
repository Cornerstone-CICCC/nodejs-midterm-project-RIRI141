import { Request, Response } from "express";


const home = (req: Request, res: Response) => {
    res.status(200).send("HomePage")
}
const signup = (req: Request, res: Response) => {
    res.status(200).send("SignupPage")
}
const profile = (req: Request, res: Response) => {
    res.status(200).send("ProfilePage")
}
const status =  (req: Request, res: Response) => {
    if (req.session && req.session.isLoggedIn) {
        return res.json({ isLoggedIn: true, user: req.session.user });
    }
    return res.json({ isLoggedIn: false });
}

export default {
    home,
    signup,
    profile ,
    status
}