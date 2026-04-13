export function isAdmin(user) {
  return user?.role === "admin";
}

export function isDealer(user) {
  return user?.role === "dealer";
}

export function isUser(user) {
  return user?.role === "user";
}

export function canPostVehicle(user) {
  return user?.role === "dealer" || user?.role === "admin";
}

export function safeRole(user) {
  return user?.role || "user";
}
