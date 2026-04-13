import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function DealerDashboard() {
  const vehicles = useQuery(api.vehicles.listVehicles);

  if (!vehicles) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>🚗 Dealer Dashboard</h1>

      {vehicles.map((v) => (
        <VehicleStats key={v._id} vehicle={v} />
      ))}
    </div>
  );
}

function VehicleStats({ vehicle }) {
  const stats = useQuery(api.analytics.getVehicleStats, {
    vehicleId: vehicle._id,
  });

  if (!stats) return <div>Loading stats...</div>;

  return (
    <div style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
      <h3>{vehicle.title}</h3>

      <p>👁 Views: {stats.views}</p>
      <p>💬 WhatsApp Clicks: {stats.clicks}</p>
      <p>🔥 Featured Impressions: {stats.featured}</p>
    </div>
  );
}
