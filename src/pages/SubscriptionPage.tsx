import { useConvex, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function SubscriptionPage() {
  const convex = useConvex();
  const user = useQuery(api.subscriptions.getMySubscription);

  const upgrade = async (plan) => {
    try {
      await convex.mutation(api.subscriptions.upgradeSubscription, {
        plan,
        phone: user.phone,
      });

      alert("Subscription updated!");
    } catch (err) {
      alert(err.message);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>💳 Subscription Plans</h1>

      <p>Current Plan: {user.subscriptionPlan || "none"}</p>

      <button onClick={() => upgrade("basic")}>Basic - KES 500</button>
      <button onClick={() => upgrade("pro")}>Pro - KES 1500</button>
      <button onClick={() => upgrade("premium")}>Premium - KES 3000</button>
    </div>
  );
}
