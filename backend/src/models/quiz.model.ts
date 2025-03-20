import { Quiz, QuizResponse } from "../types/quiz";


class QuizModel {
    private quizzes: Quiz[] = []

    // async getCategory() {
    //     const QUIZ_CATEGORY_API = process.env.QUIZ_CATEGORY_API;
    //     const response = await fetch(`${QUIZ_CATEGORY_API}`);
    //     const data: QuizResponse = await response.json();
    //     this.quizzes = data.results;
    //     return this.quizzes;
    // }

    async getQuiz(amount: string, category: string, difficulty: string) {
        const QUIZ_API = process.env.QUIZ_API;
        const response = await fetch(`${QUIZ_API}?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`);
        const data: QuizResponse = await response.json();
        // console.log("QUIZ_API", process.env.QUIZ_API)
        console.log(data)
        
        return data.results
    } 
}
export default new QuizModel