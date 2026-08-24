import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("employee");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const employeeData = {
      name: name
    };

    const token = "sample-token";

    login(employeeData, token, role);

    navigate("/my-leaves");
  };

  return (
    <div>
      <h1>Employee Leave Management</h1>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <br /><br />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="employee">Employee</option>
          <option value="hr">HR</option>
        </select>

        <br /><br />

        <button type="submit">
          Login
        </button>

      </form>
    </div>
  );
}

export default LoginPage;