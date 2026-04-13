const KEY = "rigid_cars";

const defaultCars = [
  {
    id: 1,
    title: "Toyota Land Cruiser Prado",
    price: 5200000,
    location: "Nairobi",
    image: "https://cdn.motor1.com/images/mgl/0AN2K/s1/toyota-land-cruiser-prado.jpg",
  },
  {
    id: 2,
    title: "Subaru Forester",
    price: 2400000,
    location: "Mombasa",
    image: "https://cdn.motor1.com/images/mgl/BXxR6/s1/subaru-forester.jpg",
  },
  {
    id: 3,
    title: "Mazda CX-5",
    price: 2800000,
    location: "Nairobi",
    image: "https://cdn.motor1.com/images/mgl/8g0lX/s1/mazda-cx-5.jpg",
  },
  {
    id: 4,
    title: "Toyota Fielder",
    price: 1500000,
    location: "Nairobi",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Toyota_Corolla_Fielder.jpg",
  },
  {
    id: 5,
    title: "Nissan Note",
    price: 950000,
    location: "Mombasa",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Nissan_Note.jpg",
  },
  {
    id: 6,
    title: "Toyota Mark X",
    price: 1800000,
    location: "Nairobi",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Toyota_Mark_X.jpg",
  },
];

function getCars() {
  let cars = JSON.parse(localStorage.getItem(KEY));

  if (!cars || cars.length === 0) {
    localStorage.setItem(KEY, JSON.stringify(defaultCars));
    return defaultCars;
  }

  return cars;
}

function saveCars(cars) {
  localStorage.setItem(KEY, JSON.stringify(cars));
}

export function getAllCars() {
  return getCars();
}
