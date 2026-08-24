import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function HRPanel() {
  const { role } = useAuth();

  if (role !== "hr") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <h1>HR Panel</h1>
      <p>Welcome to the HR Panel.</p>
    </div>
  );
}

export default HRPanel;