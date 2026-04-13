import { query } from "./_generated/server";

export const getCurrentUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) return null;

    const email = identity.email;

    if (!email) return null;

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), email))
      .first();

    return user;
  },
});
