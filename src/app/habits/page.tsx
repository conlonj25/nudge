import { NavBarComponent } from "~/components/nav-bar";
import { HydrateClient } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <NavBarComponent session={session} />
      {session && (
        <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-pink-400 to-white to-90%">
          <div className="container flex flex-col items-center justify-center gap-12 p-8">
            <h1>Habits</h1>
          </div>
        </main>
      )}
    </HydrateClient>
  );
}
