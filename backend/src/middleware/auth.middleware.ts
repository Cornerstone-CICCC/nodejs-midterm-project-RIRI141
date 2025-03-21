import { Request, Response, NextFunction } from "express";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session || !req.session.isLoggedIn) {
        return res.status(401).json({ error: "Unauthorized" });
    } else  res.status(200).json({ isLoggedIn: true, userId: req.session.userId });
    next();
};
