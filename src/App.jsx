import { useState } from "react";
import Login from "./Login";

import { getUser, logout } from "./auth/auth";
import { getAllCars } from "./carsStore";

import AdminPanel from "./admin/AdminPanel";
import AdsBoard from "./ads/AdsBoard";
import AuctionPanel from "./auction/AuctionPanel";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [tab, setTab] = useState("home");

  const user = getUser();
  const cars = getAllCars();

  return (
    <div style={styles.app}>
      {/* ===== HEADER ===== */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.logo}>🚗 RIGID MOTORS</h1>
          <p style={styles.slogan}>
            Buy • Sell • Auction Cars in Kenya
          </p>
        </div>

        <div>
          {user ? (
            <button
              onClick={() => {
                logout();
                location.reload();
              }}
            >
              Logout ({user.role})
            </button>
          ) : (
            <button onClick={() => setShowLogin(true)}>
              Login
            </button>
          )}
        </div>
      </div>

      {/* LOGIN */}
      {showLogin && (
        <div style={styles.modal}>
          <div style={styles.modalBox}>
            <Login goToApp={() => setShowLogin(false)} />
          </div>
        </div>
      )}

      {/* NAV */}
      <div style={styles.tabs}>
        <button onClick={() => setTab("home")}>Home</button>
        <button onClick={() => setTab("ads")}>Ads</button>
        <button onClick={() => setTab("auctions")}>
          Auctions
        </button>

        {user?.role === "admin" && (
          <button onClick={() => setTab("admin")}>
            Admin
          </button>
        )}
      </div>

      {/* ===== HERO ===== */}
      {tab === "home" && (
        <div style={styles.hero}>
          <h2>Find Your Perfect Car</h2>
        </div>
      )}

      {/* ===== ADS ===== */}
      {tab === "ads" && <AdsBoard />}

      {/* ===== AUCTIONS ===== */}
      {tab === "auctions" && <AuctionPanel />}

      {/* ===== ADMIN (RBAC) ===== */}
      {tab === "admin" && user?.role === "admin" && (
        <AdminPanel />
      )}

      {/* ===== MARKETPLACE ===== */}
      {tab === "home" && (
        <div style={styles.grid}>
          {cars.map((car) => (
            <div key={car.id} style={styles.card}>
              <img src={car.image} style={styles.image} />

              <h3>{car.title}</h3>
              <p>KSh {car.price.toLocaleString()}</p>

              <button style={styles.whatsapp}>
                Contact Seller
              </button>

              {user?.role === "dealer" && (
                <button style={styles.feature}>
                  Boost Listing
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ===== STYLES ===== */
const styles = {
  app: { background: "#0b1220", color: "white" },

  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: 20,
    borderBottom: "1px solid #1f2937",
  },

  logo: { fontSize: 28 },

  slogan: { color: "#9ca3af" },

  tabs: {
    display: "flex",
    gap: 10,
    padding: 10,
  },

  hero: {
    padding: 40,
    textAlign: "center",
    fontSize: 30,
  },

  grid: {
    padding: 20,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
    gap: 15,
  },

  card: {
    background: "#111827",
    padding: 10,
    borderRadius: 10,
  },

  image: {
    width: "100%",
    height: 140,
    objectFit: "cover",
  },

  whatsapp: {
    background: "#25D366",
    width: "100%",
    padding: 8,
    border: "none",
  },

  feature: {
    background: "gold",
    width: "100%",
    padding: 8,
    border: "none",
    marginTop: 5,
  },

  modal: {
    position: "fixed",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.7)",
  },

  modalBox: {
    background: "#111827",
    padding: 20,
    margin: "10% auto",
    width: 300,
  },
};
