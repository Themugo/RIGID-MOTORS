import { mutation } from "./_generated/server";

/**
 * ⏰ AUTO EXPIRE SUBSCRIPTIONS
 */
export const expireSubscriptions = mutation({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();

    for (const user of users) {
      if (!user.subscriptionEnd) continue;

      if (user.subscriptionEnd < Date.now()) {
        await ctx.db.patch(user._id, {
          subscriptionPlan: "none",
          subscriptionEnd: undefined,
        });
      }
    }

    return { success: true };
  },
});
