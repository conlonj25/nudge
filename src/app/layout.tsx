import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { getServerAuthSession } from "~/server/auth";
import { NavBarComponent } from "~/components/nav-bar";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const session = await getServerAuthSession();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <NavBarComponent session={session} />
          <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-pink-400 to-white to-90%">
            {children}
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
