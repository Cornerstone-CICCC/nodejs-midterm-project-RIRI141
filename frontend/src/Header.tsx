import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  
  const checkLoginStatus = async () => {
    
      const res = await fetch("http://localhost:4000/status", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setIsLoggedIn(data.isLoggedIn);
      } else {
        console.error("Failed to check login status");
      }
  };

  const handleLogOut = async () => {
    try {
      const response = await fetch("http://localhost:4000/logout", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        setIsLoggedIn(false); 
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, [isLoggedIn]);

  return (
    <header>
      <div className="header">
        <h1>Your Knowledge Academia</h1>
        <nav>
          <ul>
            {isLoggedIn ? (
              <>
                <li>
                  <a href="/profile">Profile</a>
                </li>
                <li>
                  <a href="/quiz">Quiz</a>
                </li>
                <li>
                  <button onClick={handleLogOut}>Log Out</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/signup">Sign Up</a>
                </li>
                <li>
                  <a href="/login">Log In</a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
