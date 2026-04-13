const KEY = "rigid_user";

export function setUser(user) {
  localStorage.setItem(KEY, JSON.stringify(user));
}

export function getUser() {
  return JSON.parse(localStorage.getItem(KEY));
}

export function logout() {
  localStorage.removeItem(KEY);
}