import { mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * 💳 SAVE MPESA SUBSCRIPTION PAYMENT
 */
export const handleSubscriptionPayment = mutation({
  args: {
    phone: v.string(),
    amount: v.number(),
    mpesaReceipt: v.string(),
    plan: v.union(
      v.literal("basic"),
      v.literal("pro"),
      v.literal("premium")
    ),
  },

  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("phone"), args.phone))
      .first();

    if (!user) throw new Error("User not found");

    // 💳 SAVE PAYMENT
    await ctx.db.insert("payments", {
      userId: user._id,
      phone: args.phone,
      amount: args.amount,
      type: "subscription",
      status: "completed",
      mpesaReceipt: args.mpesaReceipt,
      createdAt: Date.now(),
    });

    // 🧾 PLAN DURATION (30 DAYS)
    const duration = 30 * 24 * 60 * 60 * 1000;

    await ctx.db.patch(user._id, {
      subscriptionPlan: args.plan,
      subscriptionEnd: Date.now() + duration,
    });

    return { success: true };
  },
});
