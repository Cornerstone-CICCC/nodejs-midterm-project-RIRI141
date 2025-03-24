import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./Quiz.css";

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const Quiz = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]); // 🔥 追加

  useEffect(() => {
    const fetchQuiz = async () => {
      const amount = searchParams.get("amount") || "5";
      const category = searchParams.get("category") || "9";
      const difficulty = searchParams.get("difficulty") || "easy";

      const response = await fetch(
        `http://localhost:4000/api/quiz?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error("Failed to fetch quiz");
      setQuestions(data);
    };

    fetchQuiz();
  }, [searchParams]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setUserAnswers([...userAnswers, answer]); // 🔥 ユーザーの回答を保存
    if (answer === questions[currentIndex].correct_answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    } else {
      navigate("/result", { 
        state: { 
          score, 
          total: questions.length, 
          questions,  // 🔥 クイズデータを渡す
          userAnswers  // 🔥 ユーザーの回答を渡す
        } 
      });
    }
  };

  if (questions.length === 0) return <p>Loading...</p>;

  const currentQuestion = questions[currentIndex];

  if (!currentQuestion) return <p>Loading...</p>;

  const choices = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ].sort();

  return (
    <div className="quiz-container">
      <h1>
        Quiz {currentIndex + 1} / {questions.length}
      </h1>
      <h2 dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />

      <div className="choices">
        {choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => {
              handleAnswer(choice);
            }}
            id={`choice${index + 1}`}
            className={`${
              selectedAnswer === choice
                ? choice === currentQuestion.correct_answer
                  ? "correct"
                  : "incorrect"
                : ""
            } ${selectedAnswer === choice ? "choiced" : ""}`}
          >
            {choice}
          </button>
        ))}
      </div>
      <button id="next" onClick={nextQuestion}>Next</button>
    </div>
  );
};

export default Quiz;
