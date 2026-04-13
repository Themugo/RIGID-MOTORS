import BoostButton from "./BoostButton";
import FeaturedBadge from "./FeaturedBadge";

/**
 * 🚗 SINGLE VEHICLE CARD
 * Displays vehicle info + monetization controls
 */

export default function VehicleCard({ vehicle }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        background: "#fff",
      }}
    >
      {/* 🔥 FEATURED BADGE */}
      <FeaturedBadge vehicle={vehicle} />

      {/* 🚗 VEHICLE INFO */}
      <h2 style={{ margin: "8px 0" }}>{vehicle.title}</h2>

      <p>
        <strong>Make:</strong> {vehicle.make}
      </p>

      <p>
        <strong>Model:</strong> {vehicle.model}
      </p>

      <p>
        <strong>Price:</strong> KES {vehicle.price}
      </p>

      {/* ⭐ BOOST BUTTON (MONETIZATION) */}
      <div style={{ marginTop: 10 }}>
        <BoostButton vehicleId={vehicle._id} />
      </div>
    </div>
  );
}
