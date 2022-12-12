import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const isLogged = false;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
