import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navigation() {
  const { role, logout } = useAuth();

  return (
    <nav>
      <Link to="/login">Login</Link>{" | "}

      <Link to="/apply">Apply Leave</Link>{" | "}

      <Link to="/my-leaves">My Leaves</Link>{" | "}

      {role === "hr" && (
        <>
          <Link to="/hr-panel">HR Panel</Link>{" | "}
        </>
      )}

      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default Navigation;