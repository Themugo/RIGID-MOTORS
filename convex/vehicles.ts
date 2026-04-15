import { query } from "./_generated/server";

export const getVehicles = query({
  handler: async (ctx) => {
    return await ctx.db.query("vehicles").collect();
  },
});
