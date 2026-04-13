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

  // FILTER STATES
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [location, setLocation] = useState("");

  const user = getUser();
  const cars = getAllCars();
  const payments = getPayments();

  const featuredIds = payments.featured;

  // FILTER LOGIC
  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.title.toLowerCase().includes(search.toLowerCase());

    const matchesPrice =
      !maxPrice || Number(car.price) <= Number(maxPrice);

    const matchesLocation =
      !location || car.location === location;

    return matchesSearch && matchesPrice && matchesLocation;
  });

  const featuredCars = filteredCars.filter((c) =>
    featuredIds.includes(c.id)
  );

  const normalCars = filteredCars.filter(
    (c) => !featuredIds.includes(c.id)
  );

  return (
    <div style={styles.app}>
      {/* ================= HERO ================= */}
      <div style={styles.hero}>
        <h1>🚗 Find Your Perfect Car</h1>
        <p>Buy • Sell • Auction Cars Across Kenya</p>

        {/* SEARCH BAR */}
        <div style={styles.searchBar}>
          <input
            placeholder="Search (e.g. Prado, Mazda CX-5)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />

          <input
            placeholder="Max Price (KSh)"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
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

      {/* ================= HEADER ================= */}
      <div style={styles.header}>
        <h2>Rigid Motors</h2>

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

      {/* LOGIN MODAL */}
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
      <p style={{ fontSize: 12 }}>{car.location || "Kenya"}</p>

      {featured && <p style={{ color: "gold" }}>⭐ Featured</p>}

      <button style={styles.whatsapp}>
        💬 Contact Seller
      </button>

      {user?.role === "dealer" && !featured && (
        <button
          style={styles.feature}
          onClick={() => {
            featureCar(car.id);
            alert("Boosted!");
          }}
        >
          🔥 Boost
        </button>
      )}
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  app: { background: "#0b1220", color: "white", minHeight: "100vh" },

  hero: {
    background: "#111827",
    padding: 30,
    textAlign: "center",
  },

  searchBar: {
    display: "flex",
    gap: 10,
    marginTop: 15,
    flexWrap: "wrap",
    justifyContent: "center",
  },

  input: {
    padding: 10,
    borderRadius: 6,
    border: "none",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: 15,
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
  },

  tabs: {
    display: "flex",
    gap: 10,
    padding: 10,
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
