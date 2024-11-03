"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { signIn, signOut } from "next-auth/react";
import { type Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

type UserAvatarProps = {
  userImage: string;
  userFallback: string;
  session: Session | null;
};

export default function UserAvatar({
  userImage,
  userFallback,
  session,
}: UserAvatarProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={userImage} />
            <AvatarFallback>{userFallback}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {!session && (
            <DropdownMenuItem onClick={() => signIn()}>
              Sign In
            </DropdownMenuItem>
          )}
          {session && (
            <DropdownMenuItem onClick={() => signOut()}>
              Sign Out
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
