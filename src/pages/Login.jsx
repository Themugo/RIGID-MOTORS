import { useConvex } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const convex = useConvex();
  const navigate = useNavigate();

  const handleLoginSuccess = async () => {
    try {
      // 👤 create user if not exists
      await convex.mutation(api.users.createUserIfNotExists);

      // 👤 fetch user
      const user = await convex.query(api.users.getCurrentUser);

      if (!user) {
        navigate("/complete-profile");
        return;
      }

      // 🧭 role routing
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "dealer") {
        navigate("/dealer");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      navigate("/");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Login Page</h1>

      <button onClick={handleLoginSuccess}>
        Simulate Login
      </button>
    </div>
  );
}
