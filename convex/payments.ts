import { mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * 💳 HANDLE PAYMENT
 */
export const handleSubscriptionPayment = mutation({
  args: {
    phone: v.string(),
    amount: v.number(),
    mpesaReceipt: v.string(),
    plan: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("phone"), args.phone))
      .first();

    if (!user) throw new Error("User not found");

    await ctx.db.insert("payments", {
      userId: user._id,
      phone: args.phone,
      amount: args.amount,
      type: "subscription",
      status: "completed",
      mpesaReceipt: args.mpesaReceipt,
      createdAt: Date.now(),
    });

    await ctx.db.patch(user._id, {
      subscriptionPlan: args.plan,
      subscriptionEnd: Date.now() + 30 * 24 * 60 * 60 * 1000,
    });

    return { success: true };
  },
});
