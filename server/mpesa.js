app.post("/mpesa/callback", async (req, res) => {
  try {
    const callback = req.body;

    const result = callback.Body.stkCallback;

    console.log("📩 MPESA CALLBACK:", JSON.stringify(result, null, 2));

    // ❌ FAILED PAYMENT
    if (result.ResultCode !== 0) {
      console.log("Payment failed");
      return res.json({ ResultCode: 0, ResultDesc: "Failed ignored" });
    }

    const metadata = result.CallbackMetadata?.Item || [];

    const receipt = metadata.find(i => i.Name === "MpesaReceiptNumber")?.Value;
    const phone = metadata.find(i => i.Name === "PhoneNumber")?.Value;
    const amount = metadata.find(i => i.Name === "Amount")?.Value;

    console.log("✅ PAYMENT SUCCESS:", {
      receipt,
      phone,
      amount,
    });

    // 🔥 SEND TO CONVEX (AUTO BOOST TRIGGER)
    await fetch("http://localhost:3000/api/mpesa-webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone,
        amount,
        mpesaReceipt: receipt,
      }),
    });

    res.json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (err) {
    console.error("Callback error:", err);
    res.json({ ResultCode: 0 });
  }
});
