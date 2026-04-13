import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// 🚗 CREATE VEHICLE (PROTECTED)
export const createVehicle = mutation({
  args: {
    title: v.string(),
    make: v.string(),
    model: v.string(),
    price: v.number(),
    images: v.array(v.string()),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .first();

    if (!user) throw new Error("User not found");

    // 🔐 RBAC CHECK
    if (user.role !== "dealer" && user.role !== "admin") {
      throw new Error("Only dealers can post vehicles");
    }

    return await ctx.db.insert("vehicles", {
      ...args,
      dealerId: user._id,
      isFeatured: false,
      createdAt: Date.now(),
    });
  },
});

// 📦 GET VEHICLES (WITH FEATURED FIRST)
export const listVehicles = query({
  handler: async (ctx) => {
    const vehicles = await ctx.db.query("vehicles").collect();

    return vehicles.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return b.createdAt - a.createdAt;
    });
  },
});
