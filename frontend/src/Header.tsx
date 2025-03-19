// import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  // const navigate = useNavigate();

  return (
    <header>
      <div className="header">
        <h1>Your Knowledge Academia</h1>
        <nav>
          <li>
            <a href="/signup">Sign Up</a>
          </li>
          <li>
            <a href="/login">Log In</a>
          </li>
        </nav>
      </div>
    </header>
  );
}

export default Header;
