import React from "react";
import { Navigate } from "react-router-dom";
import getTokenFromCookie from "../utils/cookieUtils";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = getTokenFromCookie();

  if (!token) {
    return <Navigate to="/" />;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
