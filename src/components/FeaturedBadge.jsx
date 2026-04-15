export default function FeaturedBadge({ vehicle }) {
  if (!vehicle?.isFeatured) return null;

  return (
    <div style={{ color: "red", fontWeight: "bold" }}>
      ⭐ FEATURED
    </div>
  );
}
