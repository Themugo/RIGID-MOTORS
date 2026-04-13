import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useConvex, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

/* =========================
   PAGES
========================= */

import Home from "./pages/Home";
import Login from "./pages/Login";
import DealerDashboard from "./pages/DealerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SubscriptionPage from "./pages/SubscriptionPage";
import CEOAnalytics from "./pages/CEOAnalytics";

/* =========================
   PROTECTED ROUTE
========================= */

function ProtectedRoute({ user, role, children }) {
  if (user === undefined) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

/* =========================
   MAIN APP
========================= */

export default function App() {
  const convex = useConvex();

  /**
   * 👤 AUTO USER INIT (SAFE)
   */
  useEffect(() => {
    const init = async () => {
      try {
        await convex.mutation(api.users.createUserIfNotExists);
      } catch (err) {
        console.log("User init error:", err);
      }
    };

    init();
  }, [convex]);

  /**
   * 👤 CURRENT USER
   */
  const user = useQuery(api.users.getCurrentUser);

  return (
    <BrowserRouter>
      <Routes>

        {/* 🏠 PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* 💳 SUBSCRIPTIONS */}
        <Route
          path="/subscriptions"
          element={<SubscriptionPage />}
        />

        {/* 🚗 DEALER DASHBOARD */}
        <Route
          path="/dealer"
          element={
            <ProtectedRoute user={user} role="dealer">
              <DealerDashboard />
            </ProtectedRoute>
          }
        />

        {/* 🛠 ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 📊 CEO ANALYTICS */}
        <Route
          path="/analytics"
          element={
            <ProtectedRoute user={user} role="admin">
              <CEOAnalytics />
            </ProtectedRoute>
          }
        />

        {/* ❌ FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}
