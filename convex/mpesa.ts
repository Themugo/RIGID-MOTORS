import { mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * 💳 MPESA PAYMENT WEBHOOK
 * This automatically triggers featured ads after payment
 */

export const handleMpesaPayment = mutation({
  args: {
    phone: v.string(),
    amount: v.number(),
    mpesaReceipt: v.string(),
  },

  handler: async (ctx, args) => {
    console.log("🔥 MPESA WEBHOOK RECEIVED:", args);

    // 👤 FIND USER BY PHONE
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("phone"), args.phone))
      .first();

    if (!user) {
      console.log("User not found for phone:", args.phone);
      return;
    }

    // 💳 SAVE PAYMENT
    await ctx.db.insert("payments", {
      userId: user._id,
      phone: args.phone,
      amount: args.amount,
      type: "featured_ad",
      status: "completed",
      mpesaReceipt: args.mpesaReceipt,
      createdAt: Date.now(),
    });

    // 🔥 FIND USER'S LATEST VEHICLE
    const vehicles = await ctx.db
      .query("vehicles")
      .filter((q) => q.eq(q.field("dealerId"), user._id))
      .collect();

    const latestVehicle = vehicles.sort(
      (a, b) => b.createdAt - a.createdAt
    )[0];

    if (!latestVehicle) {
      console.log("No vehicle found to boost");
      return;
    }

    // ⭐ AUTO BOOST VEHICLE
    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

    await ctx.db.patch(latestVehicle._id, {
      isFeatured: true,
      featuredUntil: Date.now() + SEVEN_DAYS,
    });

    console.log("🔥 VEHICLE AUTO-BOOSTED:", latestVehicle._id);

    return { success: true };
  },
});
