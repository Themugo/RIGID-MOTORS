import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function App() {
  const vehicles = useQuery(api.vehicles.getVehicles);

  if (!vehicles) return <p>Loading...</p>;

  return (
    <div>
      <h1>Rigid Motors</h1>

      {vehicles.map((v) => (
        <div key={v._id}>
          {v.title} - {v.price}
        </div>
      ))}
    </div>
  );
}
