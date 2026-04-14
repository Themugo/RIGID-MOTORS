/**
 * 📲 TRACK WHATSAPP CLICKS
 */

export function trackWhatsApp(carId) {
  try {
    if (!carId) {
      console.warn("No carId provided for tracking");
      return;
    }

    console.log("WhatsApp clicked:", carId);

    // 🔮 FUTURE: send to analytics backend
    // fetch("/api/track", { method: "POST", body: JSON.stringify({ carId }) });

  } catch (err) {
    console.error("Tracking error:", err);
  }
}
