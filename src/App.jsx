import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HRLoadingScreen from "./components/common/HRLoadingScreen";
import DashboardLayout from "./components/layout/DashboardLayout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Analytics from "./pages/Analytics";
import RiskPrediction from "./pages/RiskPrediction";
import EmployeeProfile from "./pages/EmployeeProfile";
import Settings from "./pages/Settings";

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <HRLoadingScreen
        onComplete={() => setLoading(false)}
      />
    );
  }

  return (
    <Routes>
      {/* Sign In page - available separately */}
      <Route path="/login" element={<Login />} />

      {/* Main dashboard - opens directly */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/risk-prediction" element={<RiskPrediction />} />
        <Route path="/employee-profile" element={<EmployeeProfile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Website opens directly on Dashboard */}
      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />

      {/* Unknown pages also go to Dashboard */}
      <Route
        path="*"
        element={<Navigate to="/dashboard" replace />}
      />
    </Routes>
  );
}

export default App;
