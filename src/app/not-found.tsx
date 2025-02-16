import { Card } from "~/components/ui/card";

export default async function Page() {
  return (
    <Card className="flex flex-col items-center gap-4 p-8">
      <h1 className="mb-4 text-center text-3xl font-bold">
        This page could not be found
      </h1>
      <p className="mb-4 text-center text-gray-500">And we looked! 🥲</p>
    </Card>
  );
}
