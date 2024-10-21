import { getServerAuthSession } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import { DailyHabits } from "./_components/daily-habits";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      {session && (
        <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-pink-400 to-white to-90%">
          <div className="container flex flex-col items-center justify-center gap-12 p-8">
            {session?.user && <DailyHabits />}
          </div>
        </main>
      )}
    </HydrateClient>
  );
}
