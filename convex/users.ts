import { query, mutation } from "./_generated/server";

/**
 * 👤 GET CURRENT USER
 */
export const getCurrentUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !identity.email) return null;

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .first();

    return user || null;
  },
});

/**
 * 🧠 CREATE USER IF NOT EXISTS
 */
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
