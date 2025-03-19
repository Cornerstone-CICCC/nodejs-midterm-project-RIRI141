import { useNavigate } from "react-router-dom";
import "./Home.css";
import brain from "../src/imgs/IconBrain.png";
import book from "../src/imgs/IconBook.png";

function Home() {
  const navigate = useNavigate();

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
          <button onClick={() => navigate("/signup")}>Sign Up</button>
          <button onClick={() => navigate("/login")}>Log In</button>
        </div>
        <div className="homeimg">
        {/* Backgrond Img */}
        </div>
      </div>
      <div className="herosection2">
        <div>
          <img id="brain"src={brain} alt="" />
          <p>Test your knowledge<br/>
          what you've learned before</p>
        </div>
        <div>
          <img id="book"src={book} alt="" />
          <p>Make your <br/>
          original QUIZ</p>
        </div>
      </div>
    </>
  );
}

export default Home;
