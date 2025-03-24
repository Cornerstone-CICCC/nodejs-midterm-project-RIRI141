import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Home.css";
import brain from "../src/imgs/IconBrain.png";
import book from "../src/imgs/IconBook.png";

function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await fetch("http://localhost:4000/status", {
          credentials: "include",
        });
        const data = await res.json();
        setIsLoggedIn(data.isLoggedIn);
      } catch (error) {
        console.error("Failed to check login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <>
      <div className="herosection">
        <div className="herosection1">
          <h1>Test your every knowledge</h1>
          <p>
            Live as if you were to die tomorrow.
            <br />
            Learn as if you were to live forever.
          </p>
          {isLoggedIn ? (
            <>
              <button onClick={() => navigate("/profile")}>Profile</button>
              <button onClick={() => navigate("/quiz")}>Quiz</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/signup")}>Sign Up</button>
              <button onClick={() => navigate("/login")}>Log In</button>
            </>
          )}
        </div>
        <div className="homeimg">
        {/* BackgroundIMG */}
        </div>
      </div>
      <div className="herosection2">
        <div>
          <img id="brain" src={brain} alt="brain" />
          <p>Test your knowledge<br/>what you've learned before</p>
        </div>
        <div>
          <img id="book" src={book} alt="book" />
          <p>Make your <br/>original QUIZ</p>
        </div>
      </div>
    </>
  );
}

export default Home;
