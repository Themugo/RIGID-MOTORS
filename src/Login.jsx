import { useState } from "react";
import { setUser } from "./auth/auth";

export default function Login({ goToApp }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("buyer");

  const login = () => {
    if (!name) return alert("Enter name");

    setUser({ name, role });
    goToApp();
  };

  return (
    <div style={styles.page}>
      <h2>🔐 Rigid Motors Login</h2>

      <input
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={styles.input}
      >
        <option value="buyer">Buyer</option>
        <option value="dealer">Dealer</option>
        <option value="admin">Admin</option>
      </select>

      <button onClick={login} style={styles.btn}>
        Enter Platform
      </button>
    </div>
  );
}

const styles = {
  page: {
    background: "#0b1220",
    color: "white",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    margin: 10,
    padding: 10,
    width: 250,
  },

  btn: {
    padding: 10,
    background: "#2563eb",
    color: "white",
    border: "none",
  },
};