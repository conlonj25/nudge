import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import { NavBarComponent } from "~/components/nav-bar";
import { getServerAuthSession } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

export const metadata: Metadata = {
  title: "Nudge",
  description: "Brick by boring brick",
  icons: [{ rel: "icon", url: "/star.png" }],
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
            <main className="flex min-h-screen flex-col items-stretch bg-gradient-to-b from-pink-400 to-white to-90% lg:items-center">
              <div className="flex flex-col items-stretch justify-center gap-12 px-2 py-6 lg:w-1/2">
                {session ? children : <h1>Please Sign In</h1>}
              </div>
            </main>
          </HydrateClient>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
