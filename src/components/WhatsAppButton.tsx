import { useConvex } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function WhatsAppButton({ vehicle }) {
  const convex = useConvex();

  const openWhatsApp = async () => {
    // 📊 TRACK CLICK
    await convex.mutation(api.analytics.trackEvent, {
      vehicleId: vehicle._id,
      type: "whatsapp_click",
    });

    const phone = "254712345678"; // replace later with dealer number

    window.open(
      `https://wa.me/${phone}?text=I'm interested in ${vehicle.title}`,
      "_blank"
    );
  };

  return (
    <button
      onClick={openWhatsApp}
      style={{
        padding: "10px",
        background: "green",
        color: "white",
        border: "none",
        borderRadius: 8,
        marginTop: 8,
      }}
    >
      💬 WhatsApp Seller
    </button>
  );
}
