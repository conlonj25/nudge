"use client";

import { type ClientSafeProvider, signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";
import Image from "next/image";

const ProviderButton = ({ provider }: { provider: ClientSafeProvider }) => {
  return (
    <Button
      variant={"secondary"}
      onClick={() => signIn(provider.id)}
      className="flex flex-row gap-4 px-24 py-8"
    >
      <Image
        src={`/${provider.id}-logo.svg`}
        alt={`${provider.name} logo`}
        width={20}
        height={20}
      />
      <span>Continue with {provider.name}</span>
    </Button>
  );
};

export default ProviderButton;
