import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function App() {
  const vehicles = useQuery(api.vehicles.getVehicles);

  console.log("FRONTEND VEHICLES:", vehicles);

  if (!vehicles) return <p>Loading...</p>;

  return (
    <div>
      <h1>Rigid Motors</h1>

      {vehicles.length === 0 && <p>No vehicles found</p>}

      {vehicles.map((v) => (
        <div key={v._id}>
          {v.title}
        </div>
      ))}
    </div>
  );
}
