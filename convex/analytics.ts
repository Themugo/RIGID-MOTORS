import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * 📊 TRACK EVENT (view, click, etc.)
 */
export const trackEvent = mutation({
  args: {
    vehicleId: v.id("vehicles"),
    type: v.union(
      v.literal("view"),
      v.literal("whatsapp_click"),
      v.literal("featured_impression")
    ),
    userId: v.optional(v.id("users")),
  },

  handler: async (ctx, args) => {
    await ctx.db.insert("analytics", {
      vehicleId: args.vehicleId,
      type: args.type,
      userId: args.userId,
      createdAt: Date.now(),
    });
  },
});

/**
 * 📊 GET VEHICLE STATS
 */
export const getVehicleStats = query({
  args: {
    vehicleId: v.id("vehicles"),
  },

  handler: async (ctx, args) => {
    const logs = await ctx.db
      .query("analytics")
      .filter((q) => q.eq(q.field("vehicleId"), args.vehicleId))
      .collect();

    return {
      views: logs.filter((l) => l.type === "view").length,
      clicks: logs.filter((l) => l.type === "whatsapp_click").length,
      featured: logs.filter((l) => l.type === "featured_impression").length,
    };
  },
});
