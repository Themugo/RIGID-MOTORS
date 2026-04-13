users: defineTable({
  name: v.string(),
  email: v.string(),

  role: v.union(
    v.literal("user"),
    v.literal("dealer"),
    v.literal("admin")
  ),

  phone: v.optional(v.string()),

  subscriptionPlan: v.union(
    v.literal("none"),
    v.literal("basic"),
    v.literal("pro"),
    v.literal("premium")
  ),

  subscriptionEnd: v.optional(v.number()),

  createdAt: v.number(),
}),
