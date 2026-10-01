import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, authLoading } = useAuth();
  const token = localStorage.getItem("access");
  const refreshToken = localStorage.getItem("refresh");

  // If there are no tokens at all, redirect to login
  if (!token && !refreshToken) {
    return <Navigate to="/login" replace />;
  }

  // While checking user profile/refreshing token, show loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07111F]">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-3 border-cyan-400 border-t-transparent" />
          <p className="text-sm font-medium text-white/70">
            Loading your session...
          </p>
        </div>
      </div>
    );
  }

  // If auth finished and neither user nor token exists, redirect to login
  if (!user && !localStorage.getItem("access")) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
