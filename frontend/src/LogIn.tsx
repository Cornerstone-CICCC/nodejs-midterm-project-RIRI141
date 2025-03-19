import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div>
          <h2>Log In</h2>
          <form onSubmit={handleLogIn}>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      );
}
export default LogIn;