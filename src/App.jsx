import { useState } from "react";
import Login from "./Login";
import AuctionPanel from "./auction/AuctionPanel";

import { getUser, logout } from "./auth/auth";
import { getAllCars } from "./carsStore";
import { featureCar, getPayments } from "./payments/payments";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [tab, setTab] = useState("marketplace");

  const user = getUser();
  const cars = getAllCars();
  const payments = getPayments();

  const featuredIds = payments.featured;

  return (
    <div style={styles.app}>

      {/* ===== TOP BRAND BAR ===== */}
      <div style={styles.brandBar}>
        <div>
          <h1 style={styles.logo}>🚗 RIGID MOTORS</h1>
          <p style={styles.slogan}>
            Quality Cars. Trusted Deals. Kenyan Prices.
          </p>
        </div>

        {user ? (
          <button onClick={() => logout() || location.reload()}>
            Logout
          </button>
        ) : (
          <button onClick={() => setShowLogin(true)}>
            Login
          </button>
        )}
      </div>

      {/* ===== HERO ===== */}
      <div style={styles.hero}>
        <div style={styles.overlay} />

        <div style={styles.heroContent}>
          <h2 style={styles.heroTitle}>
            Find Your Dream Car Today
          </h2>

          <p style={styles.heroSub}>
            Browse top vehicles across Nairobi & Mombasa
          </p>
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
        <button onClick={() => setTab("marketplace")}>
          Marketplace
        </button>
        <button onClick={() => setTab("auctions")}>
          Auctions
        </button>
      </div>

      {/* CONTENT */}
      <div style={styles.grid}>
        {cars.map((car) => {
          const featured = featuredIds.includes(car.id);

          return (
            <div key={car.id} style={styles.card}>
              <img src={car.image} style={styles.image} />

              <h3>{car.title}</h3>
              <p>KSh {car.price.toLocaleString()}</p>
              <p>{car.location}</p>

              {featured && <p style={{ color: "gold" }}>⭐ Featured</p>}

              <button style={styles.whatsapp}>
                Contact Seller
              </button>

              {user?.role === "dealer" && !featured && (
                <button
                  style={styles.feature}
                  onClick={() => featureCar(car.id)}
                >
                  Boost
                </button>
              )}
            </div>
          );
        })}
      </div>

      {tab === "auctions" && <AuctionPanel />}
    </div>
  );
}

/* ===== STYLES ===== */
const styles = {
  app: { background: "#0b1220", color: "white" },

  brandBar: {
    display: "flex",
    justifyContent: "space-between",
    padding: 20,
    borderBottom: "1px solid #1f2937",
  },

  logo: {
    fontSize: 28,
    fontWeight: "bold",
  },

  slogan: {
    color: "#9ca3af",
  },

  hero: {
    height: 300,
    backgroundImage:
      "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7')",
    backgroundSize: "cover",
  },

  overlay: {
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
  },

  heroContent: {
    position: "relative",
    top: -200,
    textAlign: "center",
  },

  heroTitle: {
    fontSize: 40,
  },

  heroSub: {
    color: "#9ca3af",
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
    marginTop: 5,
  },

  feature: {
    background: "gold",
    width: "100%",
    padding: 8,
    border: "none",
    marginTop: 5,
  },

  tabs: {
    display: "flex",
    gap: 10,
    padding: 10,
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
