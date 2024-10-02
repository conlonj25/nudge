import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { DatePickerComponent } from "~/components/date-picker";
import { NavBarComponent } from "~/components/nav-bar";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <NavBarComponent session={session} />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-t from-orange-400 via-orange-500 to-orange-600">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <DatePickerComponent />
          </h1>
        </div>
      </main>
    </HydrateClient>
  );
}
