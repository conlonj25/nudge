import type Stripe from "stripe";
import { db } from "~/server/db";
import { headers } from "next/headers";
import { createCallerFactory } from "~/server/ssc/trpc";
import { userRouter } from "~/server/ssc/routers/users";
import { env } from "~/env";

export const handleCustomerSubscriptionDeleted = async (
  stripe: Stripe,
  event: Stripe.CustomerSubscriptionDeletedEvent,
) => {
  const data = event.data;
  const customerId = data.object.customer as string;

  try {
    const customer = await stripe.customers.retrieve(customerId);

    if (customer.deleted) {
      console.error("Customer was deleted, no email available");
      return;
    }

    if (customer.email) {
      const createCaller = createCallerFactory(userRouter);

      const caller = createCaller({
        headers: headers(),
        db,
        secret: env.SSC_SECRET,
      });

      await caller.modifyUserAccess({
        email: customer.email,
        priceId: "",
        hasAccess: false,
      });
    } else {
      console.error(`No email found for customer ${customerId}`);
    }
  } catch (error) {
    console.error(`Error retrieving customer ${customerId}:`, error);
  }
};
