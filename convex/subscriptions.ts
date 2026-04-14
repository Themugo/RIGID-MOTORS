import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * 💳 UPGRADE SUBSCRIPTION
 */
export const upgradeSubscription = mutation({
  args: {
    plan: v.string(),
    phone: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("phone"), args.phone))
      .first();

    if (!user) throw new Error("User not found");

    const duration = 30 * 24 * 60 * 60 * 1000;

    await ctx.db.patch(user._id, {
      subscriptionPlan: args.plan,
      subscriptionEnd: Date.now() + duration,
    });

    return { success: true };
  },
});

/**
 * 📊 GET USER SUBSCRIPTION
 */
export const getMySubscription = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !identity.email) return null;

    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .first();
  },
});
