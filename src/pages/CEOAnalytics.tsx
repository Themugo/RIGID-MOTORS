import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function CEOAnalytics() {
  const revenue = useQuery(api.revenue.getRevenueStats);
  const metrics = useQuery(api.metrics.getPlatformMetrics);

  if (!revenue || !metrics) {
    return <div>Loading CEO Dashboard...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>📊 CEO Analytics Dashboard</h1>

      {/* 💰 REVENUE */}
      <h2>💰 Revenue</h2>
      <p>Total Revenue: KES {revenue.totalRevenue}</p>
      <p>Subscriptions: KES {revenue.subscriptionRevenue}</p>
      <p>Featured Ads: KES {revenue.featuredRevenue}</p>
      <p>Total Payments: {revenue.totalPayments}</p>

      <hr />

      {/* 📊 PLATFORM METRICS */}
      <h2>📊 Platform Metrics</h2>
      <p>Users: {metrics.totalUsers}</p>
      <p>Dealers: {metrics.totalDealers}</p>
      <p>Admins: {metrics.totalAdmins}</p>
      <p>Vehicles: {metrics.totalVehicles}</p>
      <p>Active Featured Ads: {metrics.activeFeatured}</p>
    </div>
  );
}
