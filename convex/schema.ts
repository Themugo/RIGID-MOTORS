import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  vehicles: defineTable({
    title: v.string(),
    make: v.string(),
    model: v.string(),
    year: v.number(),
    price: v.number(),
    imageUrl: v.optional(v.string()),
  }),

  users: defineTable({
    name: v.string(),
    email: v.string(),
    role: v.string(),
  }),
});
