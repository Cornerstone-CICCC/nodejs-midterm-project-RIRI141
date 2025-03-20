"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const userRouter = (0, express_1.Router)();
userRouter.get("/users", user_controller_1.default.getUsers);
userRouter.post("/signup", (req, res) => {
    user_controller_1.default.createUser(req, res);
});
userRouter.post("/login", (req, res) => {
    user_controller_1.default.loginUser(req, res);
});
userRouter.put("/:id", (req, res) => {
    user_controller_1.default.editUserById(req, res);
});
exports.default = userRouter;
