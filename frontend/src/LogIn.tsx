import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import "./Login.css";

function LogIn () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogIn = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
            credentials: "include",
        });
        if (response.ok) {
            console.log("Log In successful");
            navigate("/");
        } else {
            alert("Log In failed");
        }
    }
    return (
        <div className="loginsignupwholecontainer">
          <div id="loginImgsection">
            <p>Continue to fight...</p>
          </div>
          <div className="commonsection">
          <form onSubmit={handleLogIn}>
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
export default LogIn;