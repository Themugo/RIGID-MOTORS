const KEY = "rigid_analytics";

function getData() {
  return JSON.parse(localStorage.getItem(KEY)) || {
    views: {},
    whatsapp: {},
  };
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function trackView(carId) {
  const data = getData();
  data.views[carId] = (data.views[carId] || 0) + 1;
  save(data);
}

export function trackWhatsApp(carId) {
  const data = getData();
  data.whatsapp[carId] = (data.whatsapp[carId] || 0) + 1;
  save(data);
}

export function getAnalytics() {
  return getData();
}