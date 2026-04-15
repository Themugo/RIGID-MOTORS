import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function BoostButton({ vehicleId }) {
  const boost = useMutation(api.featuredAds?.boostVehicle || (() => {}));

  const handleBoost = async () => {
    try {
      await boost({ vehicleId });
      alert("🚀 Vehicle boosted!");
    } catch (err) {
      console.error(err);
      alert("Boost failed");
    }
  };

  return (
    <button onClick={handleBoost}>
      🔥 Boost Ad
    </button>
  );
}
