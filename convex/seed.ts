import { mutation } from "./_generated/server";

export const seedVehicles = mutation({
  handler: async (ctx) => {
    await ctx.db.insert("vehicles", {
      title: "Toyota Harrier",
      price: 3200000,
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      make: "Toyota",
      model: "Harrier",
      year: 2020,
    });

    await ctx.db.insert("vehicles", {
      title: "BMW X5",
      price: 8500000,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e",
      make: "BMW",
      model: "X5",
      year: 2022,
    });
  },
});