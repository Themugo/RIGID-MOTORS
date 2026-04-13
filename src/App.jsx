import { useState } from "react";
import Login from "./Login";
import AuctionPanel from "./auction/AuctionPanel";

import { getUser, logout } from "./auth/auth";
import { trackWhatsApp } from "./analytics/analytics";
import { getAllCars } from "./carsStore";
import { featureCar, getPayments } from "./payments/payments";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [tab, setTab] = useState("marketplace");

  const user = getUser();
  const cars = getAllCars();
  const payments = getPayments();

  const featuredIds = payments.featured;

  const featuredCars = cars.filter((c) => featuredIds.includes(c.id));
  const normalCars = cars.filter((c) => !featuredIds.includes(c.id));

  const totalRevenue = payments.transactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );

  return (
    <div style={styles.app}>

      {/* ================= HEADER ================= */}
      <div style={styles.header}>
        <div>
          <h2 style={{ margin: 0 }}>🚗 Rigid Motors</h2>
          <small style={{ color: "#9ca3af" }}>
            Buy • Sell • Auction Cars in Kenya
          </small>
        </div>

        <div>
          {user ? (
            <button
              style={styles.logout}
              onClick={() => {
                logout();
                location.reload();
              }}
            >
              Logout
            </button>
          ) : (
            <button
              style={styles.login}
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* ================= LOGIN MODAL ================= */}
      {showLogin && (
        <div style={styles.modal}>
          <div style={styles.modalBox}>
            <Login
              goToApp={() => {
                setShowLogin(false);
              }}
            />
            <button onClick={() => setShowLogin(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* ================= NAV ================= */}
      <div style={styles.tabs}>
        <button onClick={() => setTab("marketplace")}>
          Marketplace
        </button>
        <button onClick={() => setTab("auctions")}>
          Auctions
        </button>
      </div>

      {/* ================= METRICS ================= */}
      <div style={styles.metrics}>
        <div style={styles.metricCard}>🚗 {cars.length} Cars</div>
        <div style={styles.metricCard}>💰 KSh {totalRevenue}</div>
        <div style={styles.metricCard}>🔥 {featuredCars.length}</div>
      </div>

      <div style={styles.content}>

        {/* ================= MARKETPLACE ================= */}
        {tab === "marketplace" && (
          <>
            <h3>🔥 Featured Cars</h3>
            <div style={styles.grid}>
              {featuredCars.map((car) => (
                <CarCard key={car.id} car={car} user={user} featured />
              ))}
            </div>

            <h3 style={{ marginTop: 30 }}>🚗 All Cars</h3>
            <div style={styles.grid}>
              {normalCars.map((car) => (
                <CarCard key={car.id} car={car} user={user} />
              ))}
            </div>
          </>
        )}

        {/* ================= AUCTIONS ================= */}
        {tab === "auctions" && <AuctionPanel />}
      </div>
    </div>
  );
}

/* ================= CAR CARD ================= */
function CarCard({ car, user, featured }) {
  return (
    <div style={styles.card}>
      <img src={car.image} style={styles.image} />

      <h3>{car.title}</h3>
      <p>KSh {car.price}</p>

      {featured && <p style={{ color: "gold" }}>⭐ Featured</p>}

      <button
        style={styles.whatsapp}
        onClick={() => trackWhatsApp(car.id)}
      >
        💬 Contact Seller
      </button>

      {!user && (
        <p style={{ fontSize: 12, color: "#9ca3af" }}>
          Login to bid or sell
        </p>
      )}

      {user?.role === "dealer" && !featured && (
        <button
          style={styles.feature}
          onClick={() => {
            featureCar(car.id);
            alert("Boosted!");
          }}
        >
          🔥 Boost Listing
        </button>
      )}
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  app: { background: "#0b1220", color: "white", minHeight: "100vh" },

  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: 20,
  },

  login: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "8px 12px",
  },

  logout: {
    background: "red",
    color: "white",
    border: "none",
    padding: "8px 12px",
  },

  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  modalBox: {
    background: "#111827",
    padding: 20,
    borderRadius: 10,
  },

  tabs: {
    display: "flex",
    gap: 10,
    padding: 10,
  },

  metrics: {
    display: "flex",
    gap: 10,
    padding: 10,
  },

  metricCard: {
    background: "#111827",
    padding: 10,
    borderRadius: 8,
  },

  content: { padding: 15 },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))",
    gap: 10,
  },

  card: {
    background: "#111827",
    padding: 10,
    borderRadius: 10,
  },

  image: {
    width: "100%",
    height: 120,
    objectFit: "cover",
  },

  whatsapp: {
    background: "#25D366",
    border: "none",
    color: "white",
    width: "100%",
    padding: 8,
    marginTop: 5,
  },

  feature: {
    background: "gold",
    border: "none",
    width: "100%",
    padding: 8,
    marginTop: 5,
  },
};
