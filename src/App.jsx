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
import { useAuth } from "./context/AuthContext";

function ProtectedRoutes() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <DashboardLayout />;
}

function AppRoutes() {
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
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/risk-prediction" element={<RiskPrediction />} />
        <Route path="/employee-profile" element={<EmployeeProfile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return <AppRoutes />;
}
