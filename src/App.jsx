<div className="max-w-6xl mx-auto p-6">
  
  {/* HEADER */}
  <h1 className="text-3xl font-bold text-center mb-8">
    🚗 Rigid Motors Marketplace
  </h1>

  {/* GRID */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    
    {vehicles.map((vehicle) => (
      <VehicleCard key={vehicle._id} vehicle={vehicle} />
    ))}

  </div>
</div>
