import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * 📦 FULL DATABASE SCHEMA (STABLE)
 */

export default defineSchema({

  users: defineTable({
    name: v.string(),
    email: v.string(),

    role: v.union(
      v.literal("user"),
      v.literal("dealer"),
      v.literal("admin")
    ),

    phone: v.optional(v.string()),

    subscriptionPlan: v.optional(
      v.union(
        v.literal("none"),
        v.literal("basic"),
        v.literal("pro"),
        v.literal("premium")
      )
    ),

    subscriptionEnd: v.optional(v.number()),

    createdAt: v.number(),
  }),

  vehicles: defineTable({
    title: v.string(),
    make: v.string(),
    model: v.string(),
    price: v.number(),

    dealerId: v.id("users"),

    isFeatured: v.optional(v.boolean()),
    featuredUntil: v.optional(v.number()),

    createdAt: v.number(),
  }),

  analytics: defineTable({
    vehicleId: v.id("vehicles"),
    views: v.number(),
    clicks: v.number(),
  }),

  payments: defineTable({
    userId: v.id("users"),
    phone: v.string(),
    amount: v.number(),

    type: v.string(), // subscription / featured_ad
    status: v.string(),

    mpesaReceipt: v.optional(v.string()),

    createdAt: v.number(),
  }),

});
