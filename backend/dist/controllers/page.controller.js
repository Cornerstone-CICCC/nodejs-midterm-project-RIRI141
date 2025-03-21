"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const home = (req, res) => {
    res.status(200).send("HomePage");
};
const signup = (req, res) => {
    res.status(200).send("SignupPage");
};
const profile = (req, res) => {
    res.status(200).send("ProfilePage");
};
const status = (req, res) => {
    if (req.session && req.session.isLoggedIn) {
        return res.json({ isLoggedIn: true, user: req.session.user });
    }
    return res.json({ isLoggedIn: false });
};
exports.default = {
    home,
    signup,
    profile,
    status
};
