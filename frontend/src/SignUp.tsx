import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });
    if (response.ok) {
      navigate("/login");
    } else {
      alert("Sign up failed");
    }
  };
  return (
      <div className="loginsignupwholecontainer">
        <div id="signupImgsection">
          <p>Fight Your Limit!!!</p>
        </div>
        <div className="commonsection">
          <form onSubmit={handleSignUp}>
            <label>
              <p>Username:</p>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
              />
            </label>
            <label>
              <p>Password:</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </label>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
  
  );
}
export default SignUp;
