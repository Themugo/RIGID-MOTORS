import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// 👤 GET CURRENT USER (SAFE)
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

    return user || null;
  },
});

// 🧠 AUTO CREATE USER IF NOT EXISTS
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
      role: "user", // default role
      createdAt: Date.now(),
    });
  },
});
