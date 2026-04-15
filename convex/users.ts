import { query, mutation } from "./_generated/server";

export const getCurrentUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !identity.email) return null;

    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .first();
  },
});

export const createUserIfNotExists = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !identity.email) return;

    const existing = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .first();

    if (existing) return;

    await ctx.db.insert("users", {
      name: identity.name || "User",
      email: identity.email,
      role: "user",
      createdAt: Date.now(),
    });
  },
});
