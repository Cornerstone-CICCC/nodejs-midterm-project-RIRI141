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
Object.defineProperty(exports, "__esModule", { value: true });
class QuizModel {
    constructor() {
        this.quizzes = [];
    }
    // async getCategory() {
    //     const QUIZ_CATEGORY_API = process.env.QUIZ_CATEGORY_API;
    //     const response = await fetch(`${QUIZ_CATEGORY_API}`);
    //     const data: QuizResponse = await response.json();
    //     this.quizzes = data.results;
    //     return this.quizzes;
    // }
    getQuiz(amount, category, difficulty) {
        return __awaiter(this, void 0, void 0, function* () {
            const QUIZ_API = process.env.QUIZ_API;
            const response = yield fetch(`${QUIZ_API}?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`);
            const data = yield response.json();
            // console.log("QUIZ_API", process.env.QUIZ_API)
            console.log(data);
            return data.results;
        });
    }
}
exports.default = new QuizModel;
