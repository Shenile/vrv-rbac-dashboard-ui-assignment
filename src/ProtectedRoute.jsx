import React from "react";
import { Navigate } from "react-router-dom";
import { useRBAC } from "./context/RBACcontext";

const ProtectedRoute = ({ allowedContexts, element }) => {
  const { currentUserRules } = useRBAC();

  // Check if the current user has a rule matching the allowed contexts
  const hasPermission = currentUserRules?.some((rule) =>
    allowedContexts.includes(rule.context)
  );

  // Render the component if the user has permission, otherwise redirect
  return hasPermission ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
