import { useNavigate } from "react-router-dom";

function Home () {
    const navigate = useNavigate();
  
    return (
      <div>
        <h1>Home Page</h1>
        <button onClick={() => navigate("/signup")}>Sign Up</button>
        <button onClick={() => navigate("/login")}>Log In</button>
      </div>
    );
  }

  export default Home;