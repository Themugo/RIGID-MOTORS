import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, role, children }) {
  if (user === undefined) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}
