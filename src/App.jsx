import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import ApplyLeavePage from "./pages/ApplyLeavePage";
import MyLeavesPage from "./pages/MyLeavesPage";
import HRPanel from "./pages/HRPanel";

function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <hr />

      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/apply"
          element={
            <ProtectedRoute>
              <ApplyLeavePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-leaves"
          element={
            <ProtectedRoute>
              <MyLeavesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hr-panel"
          element={<HRPanel />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;