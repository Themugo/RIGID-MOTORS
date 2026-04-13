export default function FeaturedBadge({ vehicle }) {
  const isActive =
    vehicle.isFeatured &&
    vehicle.featuredUntil > Date.now();

  if (!isActive) return null;

  return (
    <div
      style={{
        background: "red",
        color: "white",
        padding: "4px 8px",
        borderRadius: 6,
        fontSize: 12,
        display: "inline-block",
      }}
    >
      🔥 FEATURED
    </div>
  );
}
