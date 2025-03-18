import { Request, Response } from "express";


const home = (req: Request, res: Response) => {
    res.status(200).send("HomePage")
}

export default {
    home
}