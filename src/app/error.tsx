"use client";

import { Card } from "~/components/ui/card";

export default function Page() {
  return (
    <Card className="flex flex-col items-center gap-4 p-8">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Something went wrong!
      </h1>
      <p className="mb-4 text-center text-gray-500">Sorry about that! 🥲</p>
    </Card>
  );
}
