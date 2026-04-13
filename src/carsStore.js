const KEY = "rigid_cars";

/* ===== DEFAULT MARKET DATA (KENYAN MARKET) ===== */
const defaultCars = [
  {
    id: 1,
    title: "Toyota Prado TX",
    price: 5200000,
    location: "Nairobi",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
  },
  {
    id: 2,
    title: "Mazda CX-5",
    price: 2800000,
    location: "Nairobi",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
  },
  {
    id: 3,
    title: "Subaru Forester",
    price: 2400000,
    location: "Mombasa",
    image: "https://images.unsplash.com/photo-1583267746897-2cf415887172",
  },
  {
    id: 4,
    title: "Toyota Fielder",
    price: 1500000,
    location: "Nairobi",
    image: "https://images.unsplash.com/photo-1549921296-3c5a5a3b2f03",
  },
  {
    id: 5,
    title: "Nissan Note",
    price: 950000,
    location: "Mombasa",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588",
  },
  {
    id: 6,
    title: "Toyota Mark X",
    price: 1800000,
    location: "Nairobi",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a",
  },
  {
    id: 7,
    title: "Toyota Crown",
    price: 3200000,
    location: "Mombasa",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
  },
  {
    id: 8,
    title: "Suzuki Alto",
    price: 650000,
    location: "Nairobi",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
  },
];

/* ===== CORE FUNCTIONS ===== */

function getCars() {
  let cars = JSON.parse(localStorage.getItem(KEY));

  // AUTO-SEED IF EMPTY
  if (!cars || cars.length === 0) {
    localStorage.setItem(KEY, JSON.stringify(defaultCars));
    return defaultCars;
  }

  return cars;
}

function saveCars(cars) {
  localStorage.setItem(KEY, JSON.stringify(cars));
}

export function addCar(car) {
  const cars = getCars();

  cars.push({
    ...car,
    id: Date.now(),
  });

  saveCars(cars);
}

export function getAllCars() {
  return getCars();
}
