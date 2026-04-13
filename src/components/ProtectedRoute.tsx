import { Navigate } from "react-router-dom";
import { useConvex, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function ProtectedRoute({ children, role }) {
  const user = useQuery(api.users.getCurrentUser);

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/home" />;
  }

  return children;
}
