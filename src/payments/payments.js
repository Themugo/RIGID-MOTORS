const KEY = "rigid_payments";

function getData() {
  return JSON.parse(localStorage.getItem(KEY)) || {
    featured: [],
    transactions: [],
  };
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function featureCar(carId) {
  const data = getData();

  if (!data.featured.includes(carId)) {
    data.featured.push(carId);
  }

  data.transactions.push({
    carId,
    amount: 500,
    date: new Date().toISOString(),
  });

  save(data);
}

export function getPayments() {
  return getData();
}