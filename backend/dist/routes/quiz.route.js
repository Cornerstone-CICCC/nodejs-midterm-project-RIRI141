"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quiz_controlloer_1 = __importDefault(require("../controllers/quiz.controlloer"));
const quizRouter = (0, express_1.Router)();
quizRouter.get('/category', quiz_controlloer_1.default.getCategory);
quizRouter.get("/quiz", (req, res) => {
    quiz_controlloer_1.default.getQuiz(req, res);
});
exports.default = quizRouter;
