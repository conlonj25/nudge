import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { subscriptionPlans } from "~/constants/subscriptionPlans";
import { getServerAuthSession } from "~/server/auth";

export default async function Page() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <>
      <Card className="flex flex-col items-center gap-4 p-8">
        <h1 className="text-center text-3xl font-bold">Subscribe to Nudge</h1>
        <p className="text-gray-500">
          Subscribe to gain access to the following benefits:
        </p>
        <div className="mb-4 flex flex-col items-center gap-2 text-gray-500">
          <ul className="list-disc">
            <li>All free-tier limits removed (God mode)</li>
            <li>Track an unlimited number of habits</li>
            <li>Personal meet and greet with Sting</li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          {subscriptionPlans.map((plan) => (
            <Card
              key={plan.tagline}
              className="flex flex-col items-center justify-between gap-4 p-8 md:w-1/2"
            >
              <p className="font-bold">{plan.tagline}</p>
              <p className="text-center text-gray-500">{plan.description}</p>

              <Link
                href={`${plan.paymentLink}?prefilled_email=${session.user.email}`}
              >
                <Button className="flex w-full flex-col p-6">
                  Buy subscription {plan.price}
                  {plan.duration}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </Card>
    </>
  );
}
