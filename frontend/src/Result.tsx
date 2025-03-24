import { useLocation, useNavigate } from "react-router-dom";
import "./Result.css";

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface ResultState {
  score: number;
  total: number;
  questions?: Question[]; // `undefined` の可能性を考慮
  userAnswers?: string[];  // `undefined` の可能性を考慮
}

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // location.stateがundefinedの時にデフォルト値を設定
  const state: ResultState = location.state ?? { score: 0, total: 0, questions: [], userAnswers: [] };

  return (
    <div className="result-container">
      <h2>Quiz Result</h2>
      <p>Score: {state.score} / {state.total}</p>

      {state.questions && state.questions.length > 0 ? (
        <ul>
          {state.questions.map((question, index) => (
            <li key={index} className="answerlist">
              <p>Q{index + 1}: <span dangerouslySetInnerHTML={{ __html: question.question }} /></p>
              <p>Your Answer: {state.userAnswers?.[index] ?? "No answer"}</p>
              <p>Correct Answer: {question.correct_answer}</p>
              <p>
                {state.userAnswers?.[index] === question.correct_answer ? "✅ Correct" : "❌ Incorrect"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No questions available. Please try again.</p>
      )}

      <button onClick={() => navigate("/")}>Go Home</button>
      <button onClick={() => navigate("/quizselect")}>Go Again</button>
    </div>
  );
};

export default Result;
