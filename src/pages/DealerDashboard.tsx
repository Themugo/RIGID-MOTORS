import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

/**
 * 🚗 DEALER DASHBOARD (PRODUCTION SAFE)
 */

export default function DealerDashboard() {
  let vehicles;

  try {
    vehicles = useQuery(api.vehicles.listVehicles);
  } catch (err) {
    console.log("Vehicle fetch error:", err);
    return <div>Error loading vehicles</div>;
  }

  // ⏳ SAFE LOADING
  if (!vehicles) {
    return <div style={{ padding: 20 }}>Loading dashboard...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🚗 Dealer Dashboard</h1>

      {vehicles.length === 0 && <p>No vehicles found.</p>}

      {vehicles.map((vehicle) => (
        <VehicleStatsCard key={vehicle._id} vehicle={vehicle} />
      ))}
    </div>
  );
}

/**
 * 📊 VEHICLE STATS CARD (SAFE)
 */
function VehicleStatsCard({ vehicle }) {
  let stats;

  try {
    stats = useQuery(api.analytics.getVehicleStats, {
      vehicleId: vehicle._id,
    });
  } catch (err) {
    console.log("Stats error:", err);
    return <p>Error loading stats</p>;
  }

  return (
    <div
      style={{
        border: "1px solid #ddd",
        margin: "10px 0",
        padding: 12,
        borderRadius: 8,
      }}
    >
      <h3>{vehicle.title}</h3>

      {!stats ? (
        <p>Loading stats...</p>
      ) : (
        <>
          <p>👁 Views: {stats?.views || 0}</p>
          <p>💬 WhatsApp Clicks: {stats?.clicks || 0}</p>
        </>
      )}
    </div>
  );
}
