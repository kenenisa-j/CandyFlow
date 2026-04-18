import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles, redirectTo }) {
  const { user, loading } = useAuth();

  // 1. Professional Loading State
  // Prevents the app from flickering or showing the login page while reading LocalStorage
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Verifying Access...</p>
      </div>
    );
  }

  // 2. Redirect to Login if not authenticated
  if (!user || !user.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // 3. Role-Based Authorization
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Dynamic redirect logic:
    // If a redirect isn't provided, send Superadmins to Dashboard and Admins to Add Expense
    const fallbackPath =
      user.role === "superadmin" ? "/dashboard" : "/add-expense";
    return <Navigate to={redirectTo || fallbackPath} replace />;
  }

  // 4. Access Granted
  return children;
}
