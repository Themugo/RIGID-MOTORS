import FeaturedBadge from "./FeaturedBadge";
import BoostButton from "./BoostButton";

export default function VehicleCard({ vehicle }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 12 }}>
      <FeaturedBadge vehicle={vehicle} />

      <h3>{vehicle.title}</h3>
      <p>{vehicle.make} {vehicle.model}</p>
      <p>KES {vehicle.price}</p>

      <BoostButton vehicleId={vehicle._id} />
    </div>
  );
}
