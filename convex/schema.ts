import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    role: v.string(),
    createdAt: v.number(),

    subscriptionPlan: v.optional(v.string()),
    subscriptionEnd: v.optional(v.number()),
    phone: v.optional(v.string()),
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
    type: v.string(),
    status: v.string(),
    mpesaReceipt: v.optional(v.string()),
    createdAt: v.number(),
  }),

  featuredAds: defineTable({
    vehicleId: v.id("vehicles"),
    startDate: v.number(),
    endDate: v.number(),
  }),
});
