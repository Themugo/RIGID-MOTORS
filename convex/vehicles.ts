import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * GET ALL VEHICLES
 */
export const getVehicles = query({
  handler: async (ctx) => {
    return await ctx.db.query("vehicles").collect();
  },
});

/**
 * ADD VEHICLE (for testing or admin use)
 */
export const addVehicle = mutation({
  args: {
    title: v.string(),
    make: v.string(),
    model: v.string(),
    year: v.number(),
    price: v.number(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("vehicles", args);
  },
});
