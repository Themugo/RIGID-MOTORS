import { query } from "./_generated/server";

/**
 * 💰 PLATFORM REVENUE DASHBOARD
 */
export const getRevenueStats = query({
  handler: async (ctx) => {
    const payments = await ctx.db.query("payments").collect();

    const subscriptions = payments.filter(
      (p) => p.type === "subscription"
    );

    const featuredAds = payments.filter(
      (p) => p.type === "featured_ad"
    );

    const totalRevenue = payments.reduce(
      (sum, p) => sum + (p.amount || 0),
      0
    );

    return {
      totalRevenue,
      subscriptionRevenue: subscriptions.reduce(
        (sum, p) => sum + p.amount,
        0
      ),
      featuredRevenue: featuredAds.reduce(
        (sum, p) => sum + p.amount,
        0
      ),
      totalPayments: payments.length,
    };
  },
});
