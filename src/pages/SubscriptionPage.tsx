import { useState } from "react";

/**
 * 💳 SUBSCRIPTION PAGE (PRODUCTION SAFE)
 */

export default function SubscriptionPage() {
  const [loading, setLoading] = useState(false);

  const pay = async (amount, plan) => {
    setLoading(true);

    try {
      const baseUrl =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

      const res = await fetch(`${baseUrl}/stkpush`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: "254712345678", // TODO: replace with real user phone
          amount,
          accountReference: plan,
        }),
      });

      const data = await res.json();
      console.log("Payment response:", data);

      alert("📲 Complete payment on your phone");
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>💳 Subscription Plans</h1>

      <p>Select a plan to unlock more vehicle listings.</p>

      <div style={{ marginTop: 20 }}>
        <button
          disabled={loading}
          onClick={() => pay(500, "basic")}
        >
          Basic - KES 500 / month
        </button>
      </div>

      <div style={{ marginTop: 10 }}>
        <button
          disabled={loading}
          onClick={() => pay(1500, "pro")}
        >
          Pro - KES 1500 / month
        </button>
      </div>

      <div style={{ marginTop: 10 }}>
        <button
          disabled={loading}
          onClick={() => pay(3000, "premium")}
        >
          Premium - KES 3000 / month
        </button>
      </div>
    </div>
  );
}
