import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Quizselect.css"

function QuizSelect() { 
    const navigate = useNavigate();
    const [amount, setAmount] = useState("5")
    const [category, setCategory] = useState("9")
    const [difficulty, setDifficulty] = useState("medium")

    const startQuiz = () => {
        navigate(`/quiz?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`)
    }
    return (
        <div className="quizselectsection">
            <h1>Prepare for QUIZ</h1>
            <label>Amount of QUIZ:</label>
      <select value={amount} onChange={(e) => setAmount(e.target.value)}>
        {[5, 10, 15, 20].map((num) => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>

      <label>Category:</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="9">General knowledge</option>
        <option value="10">Entertainment: Book</option>
        <option value="31">Japanese Manga</option>
        <option value="11">Movie</option>
        <option value="12">Music</option>
      </select>

      <label>Difficulty:</label>
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="easy">EASY</option>
        <option value="medium">NORMAL</option>
        <option value="hard">HARD</option>
      </select>

      <button onClick={startQuiz}>START</button>
        </div>
    )
}
export default QuizSelect