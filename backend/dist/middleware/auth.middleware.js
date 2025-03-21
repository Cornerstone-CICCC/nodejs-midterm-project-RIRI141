"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const checkAuth = (req, res, next) => {
    if (!req.session || !req.session.isLoggedIn) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    else
        res.status(200).json({ isLoggedIn: true, userId: req.session.userId });
    next();
};
exports.checkAuth = checkAuth;
