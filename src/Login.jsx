const user = await convex.query(api.users.getCurrentUser);

if (user.role === "admin") {
  navigate("/admin");
} else if (user.role === "dealer") {
  navigate("/dealer");
} else {
  navigate("/home");
}
