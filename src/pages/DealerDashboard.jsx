import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function DealerDashboard() {
  const vehicles = useQuery(api.vehicles.listVehicles);

  if (!vehicles) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>🚗 Dealer Dashboard</h1>

      {vehicles.length === 0 && <p>No vehicles yet</p>}

      {vehicles.map((v) => (
        <div key={v._id} style={{ border: "1px solid #ccc", margin: 10 }}>
          <h3>{v.title}</h3>
          <p>{v.make} {v.model}</p>
        </div>
      ))}
    </div>
  );
}
