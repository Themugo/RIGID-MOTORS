import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import VehicleCard from "./components/VehicleCard";

export default function App() {
  const vehicles = useQuery(api.vehicles.getVehicles);

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold text-center mb-8">
        🚗 Rigid Motors Marketplace
      </h1>

      {!vehicles && (
        <p className="text-center text-gray-500">
          Loading vehicles...
        </p>
      )}

      {vehicles && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle._id}
              vehicle={vehicle}
            />
          ))}

        </div>
      )}

    </div>
  );
}
