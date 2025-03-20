"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const quiz_model_1 = __importDefault(require("../models/quiz.model"));
// const getCategory = async (req: Request, res: Response) => {
//     const quizCategory = await quizModel.getCategory();
//     if(!quizCategory) {
//         res.status(500).json({message: "No quiz category"});
//     }
//     res.status(200).json(quizCategory);
// }
const getQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, category, difficulty } = req.query;
    if (!amount || !category || !difficulty) {
        return res.status(400).json({ message: "Missing query parameters" });
    }
    const quiz = yield quiz_model_1.default.getQuiz(String(amount), String(category), String(difficulty));
    if (!quiz || quiz.length === 0) {
        return res.status(404).json({ message: "No quiz found" });
    }
    res.status(200).json(quiz);
});
exports.default = {
    // getCategory,
    getQuiz,
};
