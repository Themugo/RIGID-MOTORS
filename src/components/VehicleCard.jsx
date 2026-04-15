export default function VehicleCard({ vehicle }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
      
      {/* IMAGE */}
      <img
        src={vehicle.imageUrl || "/placeholder-car.jpg"}
        alt={vehicle.make + " " + vehicle.model}
        className="w-full h-48 object-cover"
      />

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        
        <h2 className="text-lg font-bold text-gray-800">
          🚗 {vehicle.make} {vehicle.model}
        </h2>

        <p className="text-gray-500 text-sm">
          {vehicle.year} • {vehicle.fuel || "Fuel N/A"} • {vehicle.transmission || "Auto"}
        </p>

        <p className="text-green-600 font-bold text-lg">
          KES {vehicle.price?.toLocaleString("en-KE")}
        </p>

        <div className="flex gap-2 pt-2">
          <button className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-800">
            View Details
          </button>

          <button className="px-3 border rounded-lg hover:bg-gray-100">
            ♥
          </button>
        </div>

      </div>
    </div>
  );
}
