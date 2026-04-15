import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import VehicleCard from "../components/VehicleCard";

export default function Home() {
  const vehicles = useQuery(api.vehicles.listVehicles);

  return (
    <div style={{ padding: 20 }}>
      <h1>🚗 Rigid Motors</h1>

      {!vehicles && <p>Loading...</p>}

      {vehicles && vehicles.length === 0 && (
        <p>No vehicles yet</p>
      )}

      <div style={{ display: "grid", gap: 12 }}>
        {vehicles?.map((v) => (
          <VehicleCard key={v._id} vehicle={v} />
        ))}
      </div>
    </div>
  );
}
