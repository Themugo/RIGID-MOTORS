import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function CEOAnalytics() {
  let revenue, metrics;

  try {
    revenue = useQuery(api.revenue.getRevenueStats);
    metrics = useQuery(api.metrics.getPlatformMetrics);
  } catch (err) {
    console.log("Analytics error:", err);
    return <div>Error loading analytics</div>;
  }

  if (!revenue || !metrics) {
    return <div>Loading CEO Dashboard...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>📊 CEO Analytics Dashboard</h1>

      <h2>💰 Revenue</h2>
      <p>Total Revenue: KES {revenue.totalRevenue}</p>
      <p>Subscriptions: KES {revenue.subscriptionRevenue}</p>
      <p>Featured Ads: KES {revenue.featuredRevenue}</p>

      <hr />

      <h2>📊 Platform Metrics</h2>
      <p>Users: {metrics.totalUsers}</p>
      <p>Dealers: {metrics.totalDealers}</p>
      <p>Vehicles: {metrics.totalVehicles}</p>
    </div>
  );
}
