/**
 * 👤 ROLE HELPERS (SAFE + PRODUCTION READY)
 */

export function isAdmin(user) {
  return user && user.role === "admin";
}

export function isDealer(user) {
  return user && user.role === "dealer";
}

export function isUser(user) {
  return user && user.role === "user";
}

export function canPostVehicle(user) {
  return user && (user.role === "dealer" || user.role === "admin");
}

export function safeRole(user) {
  if (!user || !user.role) return "user";
  return user.role;
}
