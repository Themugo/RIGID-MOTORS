import { query } from "./_generated/server";

/**
 * 📊 PLATFORM METRICS
 */
export const getPlatformMetrics = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    const vehicles = await ctx.db.query("vehicles").collect();

    return {
      totalUsers: users.length,
      totalDealers: users.filter(u => u.role === "dealer").length,
      totalAdmins: users.filter(u => u.role === "admin").length,
      totalVehicles: vehicles.length,
      activeFeatured: 0,
    };
  },
});
