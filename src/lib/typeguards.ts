import type Stripe from "stripe";

export const isError = (t: unknown): t is Error =>
  !!t &&
  typeof t === "object" &&
  "message" in t &&
  typeof t.message === "string";

export const isStripeResponseCustomer = (
  t: Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>,
): t is Stripe.Response<Stripe.Customer> => {
  return "email" in t;
};
