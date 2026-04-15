import { useConvex } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const convex = useConvex();
  const navigate = useNavigate();

  const login = async () => {
    await convex.mutation(api.users.createUserIfNotExists);
    navigate("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>
      <button onClick={login}>Login</button>
    </div>
  );
}
