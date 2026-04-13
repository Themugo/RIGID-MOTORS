import { useConvex } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useNavigate } from "react-router-dom";

const convex = useConvex();
const navigate = useNavigate();

const handleLoginSuccess = async () => {
  try {
    // 👤 STEP 1: ensure user exists in DB
    await convex.mutation(api.users.createUserIfNotExists);

    // 👤 STEP 2: fetch user safely
    const user = await convex.query(api.users.getCurrentUser);

    if (!user) {
      navigate("/complete-profile");
      return;
    }

    // 🧭 STEP 3: role routing (SAFE)
    switch (user.role) {
      case "admin":
        navigate("/admin");
        break;

      case "dealer":
        navigate("/dealer");
        break;

      default:
        navigate("/home");
        break;
    }
  } catch (err) {
    console.error("Login error:", err);
    navigate("/home");
  }
};
