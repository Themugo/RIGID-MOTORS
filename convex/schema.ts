import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({

  users: defineTable({
    name: v.string(),
    email: v.string(),
    role: v.string(),
    createdAt: v.number(),
  }),

  vehicles: defineTable({
    title: v.string(),
    make: v.string(),
    model: v.string(),
    price: v.number(),

    // ✅ MAKE THESE OPTIONAL (FIX)
    dealerId: v.optional(v.id("users")),
    createdAt: v.optional(v.number()),

    // ✅ ADD YOUR EXISTING FIELDS
    year: v.optional(v.number()),
    image: v.optional(v.string()),
  }),

});
