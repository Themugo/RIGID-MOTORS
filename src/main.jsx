import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import VehicleCard from "../components/VehicleCard";

export default function Home() {
  const vehicles = useQuery(api.vehicles.listVehicles);

  if (!vehicles) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>🚗 Rigid Motors Marketplace</h1>

      {vehicles.map((v) => (
        <VehicleCard key={v._id} vehicle={v} />
      ))}
    </div>
  );
}
