const KEY = "rigid_user";

export function login(name, role) {
  const user = { name, role };
  localStorage.setItem(KEY, JSON.stringify(user));
}

export function getUser() {
  return JSON.parse(localStorage.getItem(KEY));
}

export function logout() {
  localStorage.removeItem(KEY);
}
