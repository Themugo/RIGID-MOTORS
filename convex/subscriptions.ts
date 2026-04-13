import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * 💳 UPGRADE SUBSCRIPTION
 */
export const upgradeSubscription = mutation({
  args: {
    plan: v.union(
      v.literal("basic"),
      v.literal("pro"),
      v.literal("premium")
    ),
    phone: v.string(),
  },

  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("phone"), args.phone))
      .first();

    if (!user) throw new Error("User not found");

    let duration = 30 * 24 * 60 * 60 * 1000; // 30 days

    // 💰 PLAN LIMITS
    let planLimits = {
      basic: 3,
      pro: 10,
      premium: 9999,
    };

    await ctx.db.patch(user._id, {
      subscriptionPlan: args.plan,
      subscriptionEnd: Date.now() + duration,
    });

    return {
      success: true,
      limit: planLimits[args.plan],
    };
  },
});

/**
 * 📊 GET CURRENT SUBSCRIPTION
 */
export const getMySubscription = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .first();

    return user;
  },
});
