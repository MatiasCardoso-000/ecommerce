import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

interface Params {
  children?: React.ReactNode;
  redirectTo: string;
  isAuthenticated: boolean;
}

export const ProtectedRoutes = ({
  children,
  redirectTo,
  isAuthenticated,
}: Params) => {
  const { loading } = useAuth();

  if (loading) return <h1>Loading...</h1>;

  if (!loading && !isAuthenticated) return <Navigate to={redirectTo} replace />;

  return children ? children : <Outlet />;
};
