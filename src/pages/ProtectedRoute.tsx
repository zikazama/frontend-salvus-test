import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export const ProtectedRoute = ({ children }: any) => {
  const { token } = useAuthStore();
  console.log(token);

  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child routes
  return <div className="common-style">{children}</div>;
};
