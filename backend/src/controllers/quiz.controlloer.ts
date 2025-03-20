import { Request, Response } from "express";
import quizModel from "../models/quiz.model";

// const getCategory = async (req: Request, res: Response) => {
//     const quizCategory = await quizModel.getCategory();
//     if(!quizCategory) {
//         res.status(500).json({message: "No quiz category"});
//     }
//     res.status(200).json(quizCategory);
// }
const getQuiz = async (req: Request, res: Response) => {
  const { amount, category, difficulty } = req.query;
  if (!amount || !category || !difficulty) {
    return res.status(400).json({ message: "Missing query parameters" });
  }

  const quiz = await quizModel.getQuiz(
    String(amount),
    String(category),
    String(difficulty)
  );
  if (!quiz || quiz.length === 0) {
    return res.status(404).json({ message: "No quiz found" });
  }

  res.status(200).json(quiz);
};

export default {
  // getCategory,
  getQuiz,
};
