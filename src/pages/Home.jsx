import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const vehicles = useQuery(api.vehicles.listVehicles);

  return (
    <div style={{ padding: 20 }}>
      <h1>🚗 Rigid Motors Marketplace</h1>

      {!vehicles && <p>Loading vehicles...</p>}

      {vehicles && vehicles.length === 0 && (
        <p>No vehicles available yet.</p>
      )}

      {vehicles && vehicles.length > 0 && (
        <div style={{ display: "grid", gap: 12 }}>
          {vehicles.map((v) => (
            <div
              key={v._id}
              style={{
                border: "1px solid #ccc",
                padding: 12,
                borderRadius: 8,
              }}
            >
              <h3>{v.title}</h3>
              <p>{v.make} {v.model}</p>
              <p>KES {v.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
