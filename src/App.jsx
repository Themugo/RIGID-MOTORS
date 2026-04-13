import { useEffect } from "react";
import { useConvex, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/**
 * SIMPLE PLACEHOLDER PAGES
 * (replace later with your real UI pages)
 */
function Home() {
  return <div style={{ padding: 20 }}>🏠 Home Page</div>;
}

function Login() {
  return <div style={{ padding: 20 }}>🔐 Login Page</div>;
}

function Dealer() {
  return <div style={{ padding: 20 }}>🚗 Dealer Dashboard</div>;
}

function Admin() {
  return <div style={{ padding: 20 }}>🛠 Admin Panel</div>;
}

function Loading() {
  return <div style={{ padding: 20 }}>Loading...</div>;
}

/**
 * PROTECTED ROUTE WRAPPER
 */
function ProtectedRoute({ user, role, children }) {
  if (user === undefined) return <Loading />;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
}

export default function App() {
  const convex = useConvex();

  /**
   * 🔥 AUTO CREATE USER ON APP LOAD
   * This fixes ALL login + RBAC issues permanently
   */
  useEffect(() => {
    const initUser = async () => {
      try {
        await convex.mutation(api.users.createUserIfNotExists);
      } catch (err) {
        console.log("User init skipped:", err);
      }
    };

    initUser();
  }, [convex]);

  /**
   * 👤 GET CURRENT USER (SAFE)
   */
  const user = useQuery(api.users.getCurrentUser);

  return (
    <BrowserRouter>
      <Routes>

        {/* 🏠 PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* 🚗 DEALER DASHBOARD (PROTECTED) */}
        <Route
          path="/dealer"
          element={
            <ProtectedRoute user={user} role="dealer">
              <Dealer />
            </ProtectedRoute>
          }
        />

        {/* 🛠 ADMIN PANEL (PROTECTED) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} role="admin">
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* ❌ FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}
