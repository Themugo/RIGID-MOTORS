import { useConvex } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function BoostButton({ vehicleId }) {
  const convex = useConvex();

  const boost = async () => {
    try {
      const res = await convex.mutation(api.vehicles.boostVehicle, {
        vehicleId,
      });

      alert("🔥 Vehicle boosted successfully!");
      console.log(res);
    } catch (err) {
      alert("Boost failed: " + err.message);
    }
  };

  return (
    <button
      onClick={boost}
      style={{
        padding: "10px 16px",
        background: "gold",
        border: "none",
        cursor: "pointer",
        borderRadius: 8,
        fontWeight: "bold",
      }}
    >
      ⭐ Boost Listing
    </button>
  );
}
