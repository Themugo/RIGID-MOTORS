import { query } from "./_generated/server";

/**
 * 📊 PLATFORM METRICS (FIXED)
 */
export const getPlatformMetrics = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    const vehicles = await ctx.db.query("vehicles").collect();

    const dealers = users.filter((u) => u.role === "dealer");
    const admins = users.filter((u) => u.role === "admin");

    return {
      totalUsers: users.length,
      totalDealers: dealers.length,
      totalAdmins: admins.length,
      totalVehicles: vehicles.length,
      activeFeatured: 0, // safe for now
    };
  },
});
