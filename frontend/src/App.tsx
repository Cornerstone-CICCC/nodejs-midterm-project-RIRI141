import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import Home from "./Home";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Profile from "./Profile";
import Edit from "./Edit";
import Header from "./Header";
import QuizSelect from "./Quizselect";
import Quiz from "./Quiz";
import Result from "./Result";
import Footer from "./Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/quizselect" element={<QuizSelect />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
      <Footer/>
    </Router>
  
  );
}

export default App;
