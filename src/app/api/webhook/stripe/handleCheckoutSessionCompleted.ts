import { headers } from "next/headers";
import type Stripe from "stripe";
import { env } from "~/env";
import { isStripeResponseCustomer } from "~/lib/typeguards";
import { db } from "~/server/db";
import { userRouter } from "~/server/ssc/routers/users";
import { createCallerFactory } from "~/server/ssc/trpc";
import { handleWelcomeEmail } from "./handleWelcomeEmail";

export const handleCheckoutSessionCompleted = async (
  stripe: Stripe,
  event: Stripe.CheckoutSessionCompletedEvent,
) => {
  console.warn("HANDLE CHECKOUT SESSION - VERSION 20240714");
  console.warn("ID", event.data.object.id);

  let checkoutSession: Stripe.Response<Stripe.Checkout.Session>;

  try {
    checkoutSession = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ["line_items"],
      },
    );
    console.warn("STRIPE CHECKOUT SESSION SUCCESSFUL");

    // **Wrap the rest of the code in try/catch:**
    try {
      console.warn("CHECKOUT SESSION = ", checkoutSession); // Log BEFORE rest of logic
      const customerId = checkoutSession.customer;

      if (!customerId || typeof customerId !== "string") {
        console.error(
          "received session completed event with no customer id - aborted",
        );
        return;
      }

      const priceId =
        checkoutSession.line_items?.data[0]?.price?.id ?? "unknown";

      const customer = await stripe.customers.retrieve(customerId);

      console.warn({ customer });

      if (!isStripeResponseCustomer(customer) || !customer.email) {
        console.error("customer not found - aborted");
        return;
      }

      const createCaller = createCallerFactory(userRouter);

      const caller = createCaller({
        headers: headers(),
        db,
        secret: env.SSC_SECRET,
      });

      await caller.modifyUserAccess({
        email: customer.email,
        priceId,
        hasAccess: true,
      });

      await handleWelcomeEmail({ email: customer.email });
    } catch (innerError) {
      console.error("Error after retrieve:", innerError);
      return;
    }
  } catch (error) {
    console.error("Error retrieving Checkout Session:", error);
    return;
  }
};
