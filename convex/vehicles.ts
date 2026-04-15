import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * ✅ GET ALL VEHICLES (FOR YOUR MARKETPLACE UI)
 */
export const getVehicles = query({
  handler: async (ctx) => {
    return await ctx.db.query("vehicles").collect();
  },
});

/**
 * ➕ ADD NEW VEHICLE (ADMIN / FORM USE LATER)
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
    return await ctx.db.insert("vehicles", {
      title: args.title,
      make: args.make,
      model: args.model,
      year: args.year,
      price: args.price,
      imageUrl: args.imageUrl,
    });
  },
});
