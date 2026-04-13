import { useState } from "react";

export default function BoostButton({ vehicleId }) {
  const [loading, setLoading] = useState(false);

  const boost = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: "254712345678", // replace with user phone later
          amount: 500,
          accountReference: "boost",
        }),
      });

      const data = await res.json();
      console.log(data);

      alert("📲 Check your phone to complete payment");
    } catch (err) {
      alert("Boost failed");
    }

    setLoading(false);
  };

  return (
    <button
      onClick={boost}
      disabled={loading}
      style={{
        padding: "10px 16px",
        background: "gold",
        border: "none",
        borderRadius: 8,
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      {loading ? "Processing..." : "⭐ Boost Listing (KES 500)"}
    </button>
  );
}
