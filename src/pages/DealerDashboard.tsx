import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

/**
 * 🚗 DEALER DASHBOARD (STABLE VERSION)
 */

export default function DealerDashboard() {
  const vehicles = useQuery(api.vehicles.listVehicles);

  // ⏳ SAFE LOADING STATE
  if (!vehicles) {
    return <div style={{ padding: 20 }}>Loading dashboard...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🚗 Dealer Dashboard</h1>

      {vehicles.length === 0 && (
        <p>No vehicles found.</p>
      )}

      {vehicles.map((vehicle) => (
        <VehicleStatsCard key={vehicle._id} vehicle={vehicle} />
      ))}
    </div>
  );
}

/**
 * 📊 VEHICLE STATS CARD
 * SAFE + ISOLATED HOOK USAGE
 */
function VehicleStatsCard({ vehicle }) {
  const stats = useQuery(api.analytics.getVehicleStats, {
    vehicleId: vehicle._id,
  });

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

      {/* ⏳ SAFE LOADING FOR STATS */}
      {!stats ? (
        <p>Loading stats...</p>
      ) : (
        <>
          <p>👁 Views: {stats.views}</p>
          <p>💬 WhatsApp Clicks: {stats.clicks}</p>
        </>
      )}
    </div>
  );
}
