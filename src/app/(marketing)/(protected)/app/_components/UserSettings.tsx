"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/_components/ui/avatar";
import { Button } from "@/_components/ui/button";
import { Mail, LogOut, User2, MessageCircle } from "lucide-react";
import { useUser } from "@stackframe/stack";

const UserSettings = () => {
  const user = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="cursor-pointer fixed bottom-4 left-4"
      >
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="border-2 w-10 h-10 flex items-center justify-center rounded-full">
            <AvatarFallback className="text-lg font-bold text-muted-foreground">
              {(user?.displayName ?? user?.primaryEmail ?? "A")
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-xs">
        <DropdownMenuLabel className="flex flex-col gap-1">
          <span className="font-medium flex items-center gap-2">
            <User2 className="w-4 h-4 text-muted-foreground" />{" "}
            {user?.displayName}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-2">
            <Mail className="w-3 h-3" /> {user?.primaryEmail}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            window.open("https://tally.so/r/w505Ob", "_blank");
          }}
        >
          <MessageCircle className="w-4 h-4 mr-2" /> Contact Us
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer"
          onClick={() => user?.signOut()}
        >
          <LogOut className="w-4 h-4 mr-2" /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserSettings;
