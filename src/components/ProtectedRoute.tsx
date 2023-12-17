import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = Cookies.get("JWT_TOKEN");

  if (!token) {
    window.alert(token);
    return <Navigate to="/" />;
  } else {
    window.alert(token);
    return <>{children}</>;
  }
};

export default ProtectedRoute;
