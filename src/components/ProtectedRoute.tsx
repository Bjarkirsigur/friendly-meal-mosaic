
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Bypassing authentication check - always render children
  return <>{children}</>;
};

export default ProtectedRoute;
