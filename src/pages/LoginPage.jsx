import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (response.status !== 200) {
        alert(data.message || "Login failed");
        return;
      }

      // Save employee, token and role in AuthContext
      login(
        data.employee,
        data.token,
        data.employee.role
      );

      // Go to My Leaves after login
      navigate("/my-leaves");

    } catch (error) {
      alert("Cannot connect to server");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Employee Leave Management</h1>

      <h2>Login</h2>

      <form onSubmit={handleLogin}>

        <div>
          <label>Email:</label>
          <br />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            autoComplete="email"
            required
          />
        </div>

        <br />

        <div>
          <label>Password:</label>
          <br />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            autoComplete="current-password"
            required
          />
        </div>

        <br />

        <button type="submit">
          Login
        </button>

      </form>
    </div>
  );
}

export default LoginPage;