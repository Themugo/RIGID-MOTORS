import { mutation } from "./_generated/server";

/**
 * ⏰ AUTO EXPIRE SUBSCRIPTIONS
 * (run manually or via cron later)
 */
export const expireSubscriptions = mutation({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();

    for (const user of users) {
      if (
        user.subscriptionEnd &&
        user.subscriptionEnd < Date.now()
      ) {
        await ctx.db.patch(user._id, {
          subscriptionPlan: "none",
        });
      }
    }

    return { success: true };
  },
});
