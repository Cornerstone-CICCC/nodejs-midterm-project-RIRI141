import { Router, Request, Response } from "express";
import quizController from "../controllers/quiz.controlloer";

const quizRouter = Router();

quizRouter.get('/category', quizController.getCategory);
quizRouter.get("/quiz", (req: Request, res: Response) => {
  quizController.getQuiz(req, res);
});

export default quizRouter;
