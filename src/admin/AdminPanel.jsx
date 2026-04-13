import { getAllCars } from "../carsStore";

export default function AdminPanel() {
  const cars = getAllCars();

  return (
    <div style={{ padding: 20 }}>
      <h2>🛠 Admin Dashboard</h2>

      <p>Total Cars: {cars.length}</p>

      <h3>All Listings</h3>

      {cars.map((car) => (
        <div key={car.id} style={{ marginBottom: 10 }}>
          {car.title} - KSh {car.price}
        </div>
      ))}
    </div>
  );
}
