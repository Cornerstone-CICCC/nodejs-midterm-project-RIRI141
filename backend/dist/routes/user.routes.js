"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const userRouter = (0, express_1.Router)();
userRouter.get("/users", user_controller_1.default.getUsers);
userRouter.post("/signup", (req, res) => {
    user_controller_1.default.createUser(req, res);
});
userRouter.post("/login", (req, res) => {
    user_controller_1.default.loginUser(req, res);
});
userRouter.get('/logout', user_controller_1.default.logoutUser);
userRouter.put("/edit/:id", (req, res) => {
    user_controller_1.default.editUserById(req, res);
});
userRouter.get('/:id', auth_middleware_1.checkAuth, user_controller_1.default.getUserById);
exports.default = userRouter;
