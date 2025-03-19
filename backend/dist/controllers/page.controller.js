"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const home = (req, res) => {
    res.status(200).send("HomePage");
};
const signup = (req, res) => {
    res.status(200).send("SignupPage");
};
exports.default = {
    home,
    signup
};
