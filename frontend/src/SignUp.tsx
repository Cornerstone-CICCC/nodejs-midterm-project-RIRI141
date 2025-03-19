import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp () {
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
    }
    return (
        <div>
          <h2>Sign Up</h2>
          <form onSubmit={handleSignUp}>
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
export default SignUp;