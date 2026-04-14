import { mutation } from "./_generated/server";

export const expireSubscriptions = mutation({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();

    for (const user of users) {
      const end = user.subscriptionEnd;

      if (typeof end !== "number") continue;

      if (end < Date.now()) {
        await ctx.db.patch(user._id, {
          subscriptionPlan: "none",
          subscriptionEnd: 0,
        });
      }
    }

    return { success: true };
  },
});
