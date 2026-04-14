import { query } from "./_generated/server";

/**
 * 💰 REVENUE STATS (SAFE)
 */
export const getRevenueStats = query({
  handler: async (ctx) => {
    const payments = await ctx.db.query("payments").collect();

    const totalRevenue = payments.reduce(
      (sum, p) => sum + (p.amount || 0),
      0
    );

    return {
      totalRevenue,
      subscriptionRevenue: totalRevenue,
      featuredRevenue: 0,
      totalPayments: payments.length,
    };
  },
});
