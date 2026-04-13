import { useState } from "react";
import Login from "./Login";
import AuctionPanel from "./auction/AuctionPanel";

import { getUser, logout } from "./auth/auth";
import { getAllCars } from "./carsStore";
import { featureCar, getPayments } from "./payments/payments";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [tab, setTab] = useState("marketplace");

  const [search, setSearch] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");

  const user = getUser();
  const cars = getAllCars();
  const payments = getPayments();

  const featuredIds = payments.featured;

  const filteredCars = cars.filter((car) => {
    const s = car.title.toLowerCase().includes(search.toLowerCase());
    const p = !price || car.price <= Number(price);
    const l = !location || car.location === location;
    return s && p && l;
  });

  const featured = filteredCars.filter((c) =>
    featuredIds.includes(c.id)
  );

  const normal = filteredCars.filter(
    (c) => !featuredIds.includes(c.id)
  );

  return (
    <div style={styles.app}>
      {/* HERO */}
      <div style={styles.hero}>
        <div style={styles.overlay} />

        <div style={styles.heroContent}>
          <p style={styles.topText}>
            NORTHERN BYPASS • NAIROBI • JAPANESE IMPORTS
          </p>

          <h1 style={styles.heroTitle}>
            Quality Cars,<br />
            <span style={{ color: "#3b82f6" }}>
              Kenyan Prices
            </span>
          </h1>

          <p style={styles.heroSub}>
            Reliable second-hand cars. Inspected. Ready.
            No hidden costs.
          </p>

          <div style={styles.heroButtons}>
            <button
              style={styles.primaryBtn}
              onClick={() =>
                window.scrollTo({
                  top: 700,
                  behavior: "smooth",
                })
              }
            >
              Browse Stock
            </button>

            <button style={styles.secondaryBtn}>
              📞 Call Us
            </button>
          </div>

          {/* SEARCH */}
          <div style={styles.searchBar}>
            <input
              placeholder="Search car..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.input}
            />

            <input
              placeholder="Max Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={styles.input}
            />

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={styles.input}
            >
              <option value="">All Locations</option>
              <option value="Nairobi">Nairobi</option>
              <option value="Mombasa">Mombasa</option>
            </select>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <div style={styles.header}>
        <h2>🚗 Rigid Motors</h2>

        {user ? (
          <button
            onClick={() => {
              logout();
              location.reload();
            }}
          >
            Logout
          </button>
        ) : (
          <button onClick={() => setShowLogin(true)}>
            Login
          </button>
        )}
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
      <div style={styles.content}>
        {tab === "marketplace" && (
          <>
            <h3>🔥 Featured Cars</h3>
            <div style={styles.grid}>
              {featured.map((car) => (
                <Card key={car.id} car={car} user={user} featured />
              ))}
            </div>

            <h3 style={{ marginTop: 30 }}>🚗 All Cars</h3>
            <div style={styles.grid}>
              {normal.map((car) => (
                <Card key={car.id} car={car} user={user} />
              ))}
            </div>
          </>
        )}

        {tab === "auctions" && <AuctionPanel />}
      </div>
    </div>
  );
}

/* CARD */
function Card({ car, user, featured }) {
  return (
    <div style={styles.card}>
      <img src={car.image} style={styles.image} />

      <h3>{car.title}</h3>
      <p>KSh {car.price.toLocaleString()}</p>
      <p style={{ fontSize: 12 }}>{car.location}</p>

      {featured && <p style={{ color: "gold" }}>⭐ Featured</p>}

      <button style={styles.whatsapp}>
        💬 Contact Seller
      </button>

      {user?.role === "dealer" && !featured && (
        <button
          style={styles.feature}
          onClick={() => featureCar(car.id)}
        >
          🔥 Boost
        </button>
      )}
    </div>
  );
}

/* STYLES */
const styles = {
  app: {
    background: "#0b1220",
    color: "white",
    fontFamily: "Arial",
  },

  hero: {
    position: "relative",
    height: "85vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.7)",
  },

  heroContent: {
    position: "relative",
    textAlign: "center",
    top: "50%",
    transform: "translateY(-50%)",
  },

  topText: {
    color: "#3b82f6",
    fontSize: 12,
    letterSpacing: 2,
  },

  heroTitle: {
    fontSize: 50,
    fontWeight: "bold",
  },

  heroSub: {
    color: "#9ca3af",
  },

  heroButtons: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    gap: 10,
  },

  primaryBtn: {
    background: "#2563eb",
    color: "white",
    padding: 12,
    border: "none",
  },

  secondaryBtn: {
    border: "1px solid white",
    background: "transparent",
    color: "white",
    padding: 12,
  },

  searchBar: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    gap: 10,
    flexWrap: "wrap",
  },

  input: {
    padding: 10,
    borderRadius: 5,
    border: "none",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: 15,
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

  tabs: {
    display: "flex",
    gap: 10,
    padding: 10,
  },

  content: {
    padding: 15,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
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
    width: "100%",
    padding: 8,
    border: "none",
    color: "white",
  },

  feature: {
    background: "gold",
    width: "100%",
    padding: 8,
    border: "none",
    marginTop: 5,
  },
};
