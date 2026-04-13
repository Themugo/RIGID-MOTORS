import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("vehicles").collect();
  },
});

export const add = mutation({
  args: {
    title: v.string(),
    price: v.number(),
    image: v.string(),
    make: v.string(),
    model: v.string(),
    year: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("vehicles", args);
  },
});

export const remove = mutation({
  args: {
    id: v.id("vehicles"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: {
    id: v.id("vehicles"),
    title: v.optional(v.string()),
    price: v.optional(v.number()),
    image: v.optional(v.string()),
    make: v.optional(v.string()),
    model: v.optional(v.string()),
    year: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});