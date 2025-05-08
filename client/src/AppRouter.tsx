import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { useAuth } from "./hooks/useAuth";
import { ProtectedRoutes } from "./ProtectedRoutes/ProtectedRoutes";

export const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <ProtectedRoutes
          redirectTo="/login"
          isAuthenticated={!isAuthenticated}
          children={<Route path="/dashboard" element={<Dashboard />} />}
        />
      </Routes>
    </Router>
  );
};
