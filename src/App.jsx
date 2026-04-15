import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function App() {
  const vehicles = useQuery(api.vehicles.getVehicles);

  return (
    <div style={{ padding: "20px" }}>
      
      <h1>🚗 Rigid Motors</h1>

      {/* SAFE LOADING CHECK */}
      {!vehicles && <p>Loading vehicles...</p>}

      {/* SAFE RENDER */}
      {vehicles && Array.isArray(vehicles) && vehicles.length === 0 && (
        <p>No vehicles found</p>
      )}

      {vehicles && Array.isArray(vehicles) && vehicles.length > 0 && (
        <div>
          {vehicles.map((v) => (
            <div key={v._id || v.title}>
              <h3>{v.title}</h3>
              <p>KES {v.price}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
