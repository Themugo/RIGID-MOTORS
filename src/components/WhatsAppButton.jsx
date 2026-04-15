export default function WhatsAppButton({ phone, vehicleId }) {
  const handleClick = () => {
    const url = `https://wa.me/${phone}`;
    window.open(url, "_blank");

    console.log("WhatsApp clicked:", vehicleId);
  };

  return (
    <button onClick={handleClick}>
      💬 Contact on WhatsApp
    </button>
  );
}
