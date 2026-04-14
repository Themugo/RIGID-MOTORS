import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * 🚗 CREATE VEHICLE (SAFE)
 */
export const createVehicle = mutation({
  args: {
    title: v.string(),
    make: v.string(),
    model: v.string(),
    price: v.number(),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !identity.email) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .first();

    if (!user) throw new Error("User not found");

    if (user.role !== "dealer" && user.role !== "admin") {
      throw new Error("Only dealers can post vehicles");
    }

    return await ctx.db.insert("vehicles", {
      ...args,
      dealerId: user._id,
      createdAt: Date.now(),
    });
  },
});

/**
 * 🚗 LIST VEHICLES
 */
export const listVehicles = query({
  handler: async (ctx) => {
    return await ctx.db.query("vehicles").collect();
  },
});
