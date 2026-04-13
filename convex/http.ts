import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

/**
 * 🌍 MPESA WEBHOOK ENDPOINT
 */

http.route({
  path: "/mpesa-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();

    await ctx.runMutation(api.mpesa.handleMpesaPayment, {
      phone: body.phone,
      amount: Number(body.amount),
      mpesaReceipt: body.mpesaReceipt,
    });

    return new Response("OK", { status: 200 });
  }),
});

export default http;
