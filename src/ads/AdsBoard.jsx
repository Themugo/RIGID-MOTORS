export default function AdsBoard() {
  const ads = [
    "🚗 Prado TX Available - Nairobi",
    "🔥 CX-5 Deal - Limited Offer",
    "💰 Auction This Weekend - Join Now",
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>📢 Advertisement Board</h2>

      {ads.map((ad, i) => (
        <div key={i} style={{ margin: 10 }}>
          {ad}
        </div>
      ))}
    </div>
  );
}
