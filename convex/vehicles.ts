handler: async (ctx, args) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Not authenticated");

  const user = await ctx.db
    .query("users")
    .filter((q) => q.eq(q.field("email"), identity.email))
    .first();

  if (!user) throw new Error("User not found");

  // 🔐 MUST BE DEALER
  if (user.role !== "dealer" && user.role !== "admin") {
    throw new Error("Only dealers can post vehicles");
  }

  // 📊 SUBSCRIPTION CHECK
  const plan = user.subscriptionPlan || "none";

  const limits = {
    none: 1,
    basic: 3,
    pro: 10,
    premium: 9999,
  };

  const userVehicles = await ctx.db
    .query("vehicles")
    .filter((q) => q.eq(q.field("dealerId"), user._id))
    .collect();

  if (userVehicles.length >= limits[plan]) {
    throw new Error("Upgrade subscription to post more vehicles");
  }

  return await ctx.db.insert("vehicles", {
    ...args,
    dealerId: user._id,
    isFeatured: false,
    createdAt: Date.now(),
  });
}
