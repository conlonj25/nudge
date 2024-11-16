"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { type Session } from "next-auth";
import { usePathname } from "next/navigation";
import UserAvatar from "~/app/_components/UserAvatar";
import Image from "next/image";

type NavBarComponentProps = {
  session: Session | null;
};

export function NavBarComponent({ session }: NavBarComponentProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const pathname = usePathname();

  const userImage = session?.user?.image ?? "defaultAvatar.png";
  const userFallback =
    session?.user?.name
      ?.split(" ")
      .map((s) => s.slice(0, 1))
      .join("")
      .toLocaleUpperCase() ?? "U";

  return (
    <nav className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center gap-4">
              <Image
                src="/favicon.ico"
                width={40}
                height={40}
                alt="Nudge the hippo"
              />
              <span className="text-2xl font-semibold text-foreground">
                Nudge
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href={"/"}
                className={`inline-flex items-center ${pathname === "/" ? "border-b-2 border-primary" : ""} px-1 pt-1 text-sm font-medium text-foreground`}
              >
                Today
              </Link>
              <Link
                href={"/habits"}
                className={`inline-flex items-center ${pathname === "/habits" ? "border-b-2 border-primary" : ""} px-1 pt-1 text-sm font-medium text-foreground`}
              >
                Habits
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <UserAvatar
              session={session}
              userImage={userImage}
              userFallback={userFallback}
            />
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 pb-3 pt-2">
            <Link
              href={"/"}
              className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-muted-foreground hover:border-border hover:bg-accent hover:text-foreground"
              onClick={toggleMenu}
            >
              Today
            </Link>
            <Link
              href={"/habits"}
              className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-muted-foreground hover:border-border hover:bg-accent hover:text-foreground"
              onClick={toggleMenu}
            >
              Habits
            </Link>
          </div>
          <div className="border-t border-border pb-3 pt-4">
            <div className="mt-3 space-y-1">
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                <button
                  type="button"
                  className="block w-full px-4 py-2 text-left text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  {session ? "Sign out" : "Sign in"}
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
