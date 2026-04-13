import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * 🚗 LIST VEHICLES (FEATURED FIRST)
 */
export const listVehicles = query({
  handler: async (ctx) => {
    const vehicles = await ctx.db.query("vehicles").collect();

    return vehicles.sort((a, b) => {
      const aActive = a.isFeatured && a.featuredUntil > Date.now();
      const bActive = b.isFeatured && b.featuredUntil > Date.now();

      if (aActive && !bActive) return -1;
      if (!aActive && bActive) return 1;

      return b.createdAt - a.createdAt;
    });
  },
});

/**
 * ⭐ BOOST VEHICLE (FEATURE AD)
 */
export const boostVehicle = mutation({
  args: {
    vehicleId: v.id("vehicles"),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .first();

    if (!user) throw new Error("User not found");

    const vehicle = await ctx.db.get(args.vehicleId);
    if (!vehicle) throw new Error("Vehicle not found");

    // 🔐 ONLY OWNER OR ADMIN CAN BOOST
    if (vehicle.dealerId !== user._id && user.role !== "admin") {
      throw new Error("Not allowed to boost this vehicle");
    }

    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

    await ctx.db.patch(args.vehicleId, {
      isFeatured: true,
      featuredUntil: Date.now() + SEVEN_DAYS,
    });

    return { success: true };
  },
});

/**
 * ❌ REMOVE EXPIRED FEATURED ADS (AUTO CLEANUP)
 */
export const removeExpiredFeatured = mutation({
  handler: async (ctx) => {
    const vehicles = await ctx.db.query("vehicles").collect();

    for (const v of vehicles) {
      if (v.isFeatured && v.featuredUntil < Date.now()) {
        await ctx.db.patch(v._id, {
          isFeatured: false,
        });
      }
    }

    return { cleaned: true };
  },
});
