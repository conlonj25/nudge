import { type NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { env } from "~/env";
import { handleCheckoutSessionCompleted } from "./handleCheckoutSessionCompleted";
import { handleCustomerSubscriptionDeleted } from "./handleCustomerSubscriptionDeleted";
import { isError } from "~/lib/typeguards";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = headers().get("stripe-signature");

  console.log("headers", headers.toString());

  if (!signature) {
    return NextResponse.json(
      { error: "Stripe-Signature header missing" },
      { status: 400 },
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, env.SSC_SECRET);
  } catch (err: unknown) {
    const errMessage = isError(err) ? err.message : "unknow error";

    console.error(`Webhook signature verification failed. ${errMessage}`);
    return NextResponse.json({ error: errMessage }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        void handleCheckoutSessionCompleted(stripe, event);
        break;
      }

      case "customer.subscription.deleted": {
        void handleCustomerSubscriptionDeleted(stripe, event);

        break;
      }
    }
  } catch (err) {
    const errMessage = isError(err) ? err.message : "unknow error";
    console.error(
      "stripe error: " + errMessage + " | EVENT TYPE: " + event.type,
    );
  }

  return NextResponse.json({});
}
