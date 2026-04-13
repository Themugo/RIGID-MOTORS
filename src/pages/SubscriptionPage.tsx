import { useState } from "react";

export default function SubscriptionPage() {
  const [loading, setLoading] = useState(false);

  const pay = async (amount, plan) => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: "254712345678", // replace with real user phone later
          amount,
          accountReference: "subscription",
        }),
      });

      const data = await res.json();
      console.log(data);

      alert("📲 Complete payment on your phone");
    } catch (err) {
      alert("Payment failed");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>💳 Subscription Plans</h1>

      <button disabled={loading} onClick={() => pay(500, "basic")}>
        Basic - KES 500 / month
      </button>

      <button disabled={loading} onClick={() => pay(1500, "pro")}>
        Pro - KES 1500 / month
      </button>

      <button disabled={loading} onClick={() => pay(3000, "premium")}>
        Premium - KES 3000 / month
      </button>
    </div>
  );
}
