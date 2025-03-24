import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); 
  const navigate = useNavigate();

  const checkLoginStatus = async () => {
    try {
      const res = await fetch("http://localhost:4000/status", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setIsLoggedIn(data.isLoggedIn);
      } else {
        console.error("Failed to check login status");
      }
    } catch (error) {
      console.error("Error checking login status:", error);
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


  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).classList.contains("menu-overlay")) {
      setMenuOpen(false);
    }
  };

  return (
    <header>
      <div className="header">
        <h1 onClick={() => navigate("/")}>Your Knowledge Academia</h1>

         <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>


      {menuOpen && <div className="menu-overlay" onClick={handleOutsideClick}></div>}

      <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>
        <button className="close-menu" onClick={() => setMenuOpen(false)}>×</button>
        
        <ul>
          {isLoggedIn ? (
            <>
              <li>
                <a href="/profile" onClick={() => setMenuOpen(false)}>Profile</a>
              </li>
              <li>
                <a href="/quizselect" onClick={() => setMenuOpen(false)}>Quiz</a>
              </li>
              <li>
                <button onClick={handleLogOut}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/signup" onClick={() => setMenuOpen(false)}>Sign Up</a>
              </li>
              <li>
                <a href="/login" onClick={() => setMenuOpen(false)}>Log In</a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
