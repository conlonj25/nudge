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

const session = await getServerAuthSession();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <HydrateClient>
            <NavBarComponent session={session} />
            <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-pink-400 to-white to-90%">
              <div className="container flex flex-col items-center justify-center gap-12 p-8">
                {session ? children : <h1>Please Sign In</h1>}
              </div>
            </main>
          </HydrateClient>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
