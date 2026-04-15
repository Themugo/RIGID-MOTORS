import { query } from "./_generated/server";

export const getVehicles = query({
  handler: async (ctx) => {
    const vehicles = await ctx.db.query("vehicles").collect();
    console.log("BACKEND VEHICLES:", vehicles);
    return vehicles;
  },
});
