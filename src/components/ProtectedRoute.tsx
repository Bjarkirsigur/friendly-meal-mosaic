
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Bypassing authentication check and always rendering children
  return <>{children}</>;
};

export default ProtectedRoute;
