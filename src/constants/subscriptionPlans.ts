import { env } from "~/env";

const isProuction = env.VERCEL_ENV === "production";

export const subscriptionPlans = [
  {
    tagline: "Friends of Nudge",
    description: "Monthly subscription",
    paymentLink: isProuction
      ? "https://buy.stripe.com/test_fZeeWSewP6oQ98cdQR"
      : "https://buy.stripe.com/test_fZeeWSewP6oQ98cdQR",
    price: "$5",
    duration: "/month",
  },
  {
    tagline: "Lifetime Guarantee",
    description: "A single one-off payment for lifetime access",
    paymentLink: isProuction
      ? "https://buy.stripe.com/test_00g9Cy1K38wYacgdQS"
      : "https://buy.stripe.com/test_00g9Cy1K38wYacgdQS",
    price: "$50",
    duration: "",
  },
];
