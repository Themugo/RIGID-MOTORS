import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({

  // 👤 USERS (RBAC CORE)
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
        v.literal("basic"),
        v.literal("pro"),
        v.literal("premium")
      )
    ),

    subscriptionEnd: v.optional(v.number()),

    createdAt: v.number(),
  }),

  // 🚗 VEHICLES
  vehicles: defineTable({
    title: v.string(),
    make: v.string(),
    model: v.string(),
    price: v.number(),

    images: v.array(v.string()),

    dealerId: v.id("users"),

    isFeatured: v.boolean(),
    featuredUntil: v.optional(v.number()),

    location: v.optional(v.string()),

    createdAt: v.number(),
  }),

  // 💳 PAYMENTS (M-Pesa later)
  payments: defineTable({
    userId: v.id("users"),
    phone: v.string(),
    amount: v.number(),

    type: v.union(
      v.literal("subscription"),
      v.literal("featured_ad")
    ),

    status: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("failed")
    ),

    mpesaReceipt: v.optional(v.string()),

    createdAt: v.number(),
  }),

  // 📊 ANALYTICS
  analytics: defineTable({
    vehicleId: v.id("vehicles"),

    type: v.union(
      v.literal("view"),
      v.literal("whatsapp_click"),
      v.literal("featured_impression")
    ),

    userId: v.optional(v.id("users")),

    createdAt: v.number(),
  }),

  // 🧾 SUBSCRIPTIONS
  subscriptions: defineTable({
    userId: v.id("users"),

    plan: v.union(
      v.literal("basic"),
      v.literal("pro"),
      v.literal("premium")
    ),

    status: v.union(
      v.literal("active"),
      v.literal("expired")
    ),

    startDate: v.number(),
    endDate: v.number(),

    autoRenew: v.boolean(),
  }),

});
