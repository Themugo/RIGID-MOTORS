const KEY = "rigid_cars";

function getCars() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

function saveCars(cars) {
  localStorage.setItem(KEY, JSON.stringify(cars));
}

export function addCar(car) {
  const cars = getCars();
  cars.push({ ...car, id: Date.now() });
  saveCars(cars);
}

export function getAllCars() {
  return getCars();
}
