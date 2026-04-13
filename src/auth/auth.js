const KEY = "rigid_user";

export function getUser() {
  return JSON.parse(localStorage.getItem(KEY));
}

export function login(user) {
  localStorage.setItem(KEY, JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem(KEY);
}
