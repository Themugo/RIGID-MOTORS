import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * 🚗 RIGID MOTORS FULL DATABASE SCHEMA (STABLE VERSION)
 */

export default defineSchema({
  /**
   * 👤 USERS
   */
  users: defineTable({
    name: v.string(),
    email: v.string(),
    role: v.string(), // "user" | "dealer" | "admin"
    createdAt: v.number(),

    // 💳 SUBSCRIPTIONS
    subscriptionPlan: v.optional(v.string()), // none | basic | pro | premium
    subscriptionEnd: v.optional(v.number()),

    phone: v.optional(v.string()),
  }),

  /**
   * 🚗 VEHICLES
   */
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

  /**
   * 📊 ANALYTICS
   */
  analytics: defineTable({
    vehicleId: v.id("vehicles"),
    views: v.number(),
    clicks: v.number(),
  }),

  /**
   * 💰 PAYMENTS (MPESA + SUBSCRIPTIONS)
   */
  payments: defineTable({
    userId: v.id("users"),
    phone: v.string(),
    amount: v.number(),

    type: v.string(), // subscription | featured
    status: v.string(), // pending | completed

    mpesaReceipt: v.optional(v.string()),

    createdAt: v.number(),
  }),

  /**
   * 🏆 FEATURED ADS TRACKING
   */
  featuredAds: defineTable({
    vehicleId: v.id("vehicles"),
    startDate: v.number(),
    endDate: v.number(),
  }),

});
