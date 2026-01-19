// frontend/src/routes/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import authService from "../services/authService";

function ProtectedRoute({ children }) {
  const loggedIn = authService.isLoggedIn();

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
