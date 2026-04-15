import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function App() {
  const vehicles = useQuery(api.vehicles.getVehicles);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      
      <h1>🚗 Rigid Motors Marketplace</h1>

      {!vehicles && <p>Loading vehicles...</p>}

      {vehicles && vehicles.length === 0 && (
        <p>No vehicles found</p>
      )}

      {vehicles && vehicles.length > 0 && (
        <div style={{ display: "grid", gap: "10px" }}>
          {vehicles.map((v) => (
            <div
              key={v._id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "8px"
              }}
            >
              <h3>{v.title}</h3>
              <p>{v.make} {v.model}</p>
              <p>Year: {v.year}</p>
              <p>KES {v.price.toLocaleString("en-KE")}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
