import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import { NavBarComponent } from "~/components/nav-bar";
import { getServerAuthSession } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import PlaygroundDailyHabits from "./_components/playground-daily-habits";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Nudge",
  description: "Tiny changes. Remarkable results.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <HydrateClient>
            <NavBarComponent session={session} />
            <main className="flex min-h-screen flex-col items-stretch bg-slate-500 lg:items-center">
              <div className="flex flex-col items-stretch justify-center gap-6 px-2 py-6 lg:w-1/2">
                {session ? children : <PlaygroundDailyHabits />}
              </div>
            </main>
          </HydrateClient>
        </TRPCReactProvider>
        <Analytics />
      </body>
    </html>
  );
}
