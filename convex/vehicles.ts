import { query } from "./_generated/server";

export const getVehicles = query({
  handler: async () => {
    return [
      {
        _id: "1",
        title: "Toyota Prado",
        make: "Toyota",
        model: "Prado",
        price: 8500000,
      },
    ];
  },
});
