import { useEffect } from "react";
import { useConvex } from "convex/react";
import { api } from "../../convex/_generated/api";
import BoostButton from "./BoostButton";
import FeaturedBadge from "./FeaturedBadge";

export default function VehicleCard({ vehicle }) {
  const convex = useConvex();

  // 📊 TRACK VIEW ON LOAD
  useEffect(() => {
    convex.mutation(api.analytics.trackEvent, {
      vehicleId: vehicle._id,
      type: "view",
    });
  }, [vehicle._id, convex]);

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, marginBottom: 10 }}>
      
      <FeaturedBadge vehicle={vehicle} />

      <h2>{vehicle.title}</h2>

      <p>{vehicle.make} {vehicle.model}</p>
      <p>KES {vehicle.price}</p>

      <BoostButton vehicleId={vehicle._id} />
    </div>
  );
}
