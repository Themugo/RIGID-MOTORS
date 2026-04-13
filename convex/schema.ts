import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  vehicles: defineTable({
    title: v.string(),
    price: v.number(),
    make: v.string(),
    model: v.string(),
    year: v.number(),

    images: v.array(v.string()),

    featured: v.boolean(),   // ❗ make REQUIRED (fixes Convex issues)
    whatsapp: v.string(),     // ❗ make REQUIRED for stability
  }),
});