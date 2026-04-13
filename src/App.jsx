import { useState } from "react";
import {
  trackView,
  trackWhatsApp,
  getAnalytics,
} from "./analytics/analytics";
import {
  featureCar,
  getPayments,
} from "./payments/payments";
import { getUser, logout } from "./auth/auth";
import Login from "./Login";

/* ================= CAR DATA ================= */
const cars = [
  { id: 1, title: "Toyota Prado TX", price: 7200000, image: "https://images.unsplash.com/photo-1605559424843-9e4c1f0b8d2d" },
  { id: 2, title: "Subaru Forester", price: 2800000, image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a" },
  { id: 3, title: "Mazda CX-5", price: 2600000, image: "https://images.unsplash.com/photo-1542362567-b07e54358753" },
];

export default function App() {
  const [page, setPage] = useState("home");
  const [payCar, setPayCar] = useState(null);
  const [loggedIn, setLoggedIn] = useState(!!getUser());

  const user = getUser();

  const analytics = getAnalytics();
  const payments = getPayments();

  const isFeatured = (id) => payments.featured.includes(id);

  if (!loggedIn) {
    return <Login goToApp={() => setLoggedIn(true)} />;
  }

  return (
    <div style={styles.app}>

      {/* NAV */}
      <div style={styles.nav}>
        <h2>🚗 Rigid Motors</h2>

        <div>
          <span>{user.name} ({user.role})</span>

          <button onClick={() => setPage("home")}>Marketplace</button>
          <button onClick={() => setPage("analytics")}>Analytics</button>

          {user.role === "admin" && (
            <button onClick={() => setPage("payments")}>
              Revenue
            </button>
          )}

          <button
            onClick={() => {
              logout();
              setLoggedIn(false);
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* ================= MARKETPLACE ================= */}
      {page === "home" && (
        <>
          <h3>🔥 Featured Cars</h3>

          <div style={styles.grid}>
            {cars.filter(c => isFeatured(c.id)).map(car => (
              <CarCard key={car.id} car={car} setPayCar={setPayCar} featured />
            ))}
          </div>

          <h3>All Cars</h3>

          <div style={styles.grid}>
            {cars.map(car => (
              <CarCard key={car.id} car={car} setPayCar={setPayCar} />
            ))}
          </div>
        </>
      )}

      {/* ================= ANALYTICS ================= */}
      {page === "analytics" && (
        <div>
          <h2>📊 Analytics</h2>
          <p>Views: {Object.values(analytics.views).reduce((a,b)=>a+b,0)}</p>
          <p>Clicks: {Object.values(analytics.whatsapp).reduce((a,b)=>a+b,0)}</p>
        </div>
      )}

      {/* ================= PAYMENTS (ADMIN ONLY) ================= */}
      {page === "payments" && user.role === "admin" && (
        <div>
          <h2>💰 Revenue</h2>

          {payments.transactions.map((t, i) => (
            <div key={i}>
              Car #{t.carId} — KSh {t.amount}
            </div>
          ))}
        </div>
      )}

      {/* ================= PAYMENT MODAL ================= */}
      {payCar && user.role === "dealer" && (
        <div style={styles.modal}>
          <div style={styles.box}>
            <h3>Feature {payCar.title}</h3>

            <button
              onClick={() => {
                featureCar(payCar.id);
                setPayCar(null);
                alert("Payment success (demo)");
              }}
            >
              Pay KSh 500
            </button>

            <button onClick={() => setPayCar(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= CAR CARD ================= */
function CarCard({ car, setPayCar, featured }) {
  return (
    <div style={{ ...styles.card, border: featured ? "2px solid gold" : "" }}>
      <img
        src={car.image}
        style={styles.image}
        onClick={() => trackView(car.id)}
      />

      <h3>{car.title}</h3>

      <button
        onClick={() => {
          trackWhatsApp(car.id);
          window.open("https://wa.me/254700000000");
        }}
      >
        💬 Contact
      </button>

      <button onClick={() => setPayCar(car)}>
        🔥 Feature
      </button>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  app: { background: "#0b1220", color: "white", minHeight: "100vh", padding: 20 },
  nav: { display: "flex", justifyContent: "space-between", marginBottom: 20 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 10 },
  card: { background: "#111827", padding: 10 },
  image: { width: "100%", height: 120, objectFit: "cover" },
  modal: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center" },
  box: { background: "#111827", padding: 20 },
};