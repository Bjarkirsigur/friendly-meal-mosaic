
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Bypassing authentication check - allowing direct access
  return <>{children}</>;
};

export default ProtectedRoute;
