import { mutation } from "./_generated/server";

export const createUserIfNotExists = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return;

    const email = identity.email;
    if (!email) return;

    const existing = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), email))
      .first();

    if (existing) return;

    await ctx.db.insert("users", {
      name: identity.name || "User",
      email,
      role: "user",
      createdAt: Date.now(),
    });
  },
});
