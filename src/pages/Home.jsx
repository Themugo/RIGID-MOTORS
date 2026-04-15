import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const vehicles = useQuery(api.vehicles.listVehicles);

  return (
    <div style={{ padding: 20 }}>
      <h1>🚗 Rigid Motors</h1>

      {vehicles === undefined && <p>Loading...</p>}

      {vehicles && vehicles.length === 0 && (
        <p>No vehicles available</p>
      )}

      {vehicles && vehicles.map((v) => (
        <div key={v._id}>
          <h3>{v.title}</h3>
          <p>{v.make} {v.model}</p>
          <p>KES {v.price}</p>
        </div>
      ))}
    </div>
  );
}
