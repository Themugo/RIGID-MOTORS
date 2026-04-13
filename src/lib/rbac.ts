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

export function hasActiveSubscription(user) {
  if (!user?.subscriptionEnd) return false;
  return user.subscriptionEnd > Date.now();
}
