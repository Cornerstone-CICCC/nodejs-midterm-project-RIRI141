import { useLocation, useNavigate } from "react-router-dom";
import "./Result.css"

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 0 };

  return (
    <div className="result-container">
      <h1>RESULTS</h1>
      <p>Your Score: <span className="score">{score}</span> / {total}</p>
      <button onClick={() => navigate("/")}>TOP</button>
      <button onClick={() => navigate("/quizselect")}>AGAIN</button>

    </div>
  );
};

export default Result;
