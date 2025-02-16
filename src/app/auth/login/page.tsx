import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import ProviderButton from "~/app/_components/provider-button";
import { Card } from "~/components/ui/card";
import { getServerAuthSession } from "~/server/auth";

export default async function LoginPage() {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/");
  }

  const providers = await getProviders();

  return (
    <Card className="flex flex-col items-center gap-4 p-8">
      <div>
        <h1 className="mb-4 text-center text-3xl font-bold">Welcome Back</h1>

        <p className="mb-4 text-center text-gray-500">
          Choose a method to sign in
        </p>
      </div>
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <ProviderButton provider={provider} />
          </div>
        ))}
    </Card>
  );
}
