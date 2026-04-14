import { mutation } from "./_generated/server";
import { v } from "convex/values";

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

    const plan = user.subscriptionPlan || "none";

    const limits: Record<string, number> = {
      none: 1,
      basic: 3,
      pro: 10,
      premium: 9999,
    };

    const userVehicles = await ctx.db
      .query("vehicles")
      .filter((q) => q.eq(q.field("dealerId"), user._id))
      .collect();

    if (userVehicles.length >= limits[plan]) {
      throw new Error("Upgrade subscription to post more vehicles");
    }

    return await ctx.db.insert("vehicles", {
      title: args.title,
      make: args.make,
      model: args.model,
      price: args.price,
      dealerId: user._id,
      isFeatured: false,
      createdAt: Date.now(),
    });
  },
});
