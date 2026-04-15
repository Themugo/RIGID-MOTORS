import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function App() {
  const vehicles = useQuery(api.vehicles.getVehicles);

  console.log("API TEST:", vehicles);

  return (
    <div style={{ padding: 20 }}>
      <h1>🚗 Rigid Motors</h1>

      {!vehicles && <p>Loading...</p>}

      {vehicles && vehicles.length === 0 && (
        <p>No vehicles found</p>
      )}

      {vehicles && vehicles.length > 0 && (
        <div>
          {vehicles.map((v) => (
            <div key={v._id}>
              {v.title} - {v.price}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
