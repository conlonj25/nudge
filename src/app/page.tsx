import { NavBarComponent } from "~/components/nav-bar";
import { getServerAuthSession } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import { DailyHabits } from "./_components/daily-habits";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <NavBarComponent session={session} />
      <main className="via-90%-slate-500 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-yellow-400 to-white to-20%">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          {session?.user && <DailyHabits />}
        </div>
      </main>
    </HydrateClient>
  );
}
