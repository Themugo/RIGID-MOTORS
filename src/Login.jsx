import { useState } from "react";
import { login } from "./auth/auth";

export default function Login({ goToApp }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("buyer");

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="buyer">Buyer</option>
        <option value="dealer">Dealer</option>
        <option value="admin">Admin</option>
      </select>

      <button
        onClick={() => {
          login({ name, role });
          goToApp();
        }}
      >
        Enter
      </button>
    </div>
  );
}
