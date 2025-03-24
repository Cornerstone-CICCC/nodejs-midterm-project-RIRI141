"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const page_controller_1 = __importDefault(require("../controllers/page.controller"));
// import { checkLoggedOut } from "../middleware/auth.middleware"
const pageRouter = (0, express_1.Router)();
pageRouter.get("/", page_controller_1.default.home);
pageRouter.get("/signup", page_controller_1.default.signup);
pageRouter.get('/profile', page_controller_1.default.profile);
pageRouter.get('/status', (req, res) => {
    page_controller_1.default.status(req, res);
});
exports.default = pageRouter;
