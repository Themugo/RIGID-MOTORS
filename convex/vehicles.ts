import { query } from "./_generated/server";

export const getVehicles = query({
  handler: async (ctx) => {
    const data = await ctx.db.query("vehicles").collect();
    console.log("VEHICLES FROM DB:", data);
    return data;
  },
});
