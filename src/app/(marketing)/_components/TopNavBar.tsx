"use client";

import { useStackApp } from "@stackframe/stack";

import { Button } from "@/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import Image from "next/image";

const TopNavBar = () => {
  const app = useStackApp();
  return (
    <div className="flex items-center justify-between border-b mx-auto p-4 sticky top-0 z-50">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex items-end">
          <Image
            src="/logo9.svg"
            alt="rread.it"
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <span className="text-lg font-semibold leading-none">read.it</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-x-2">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => app.redirectToSignIn()}
          >
            Login
          </Button>
          <Button
            className="cursor-pointer"
            onClick={() => app.redirectToSignUp()}
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-10 w-10 p-0">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Button
                  onClick={() => app.redirectToSignIn()}
                  variant="ghost"
                  className="w-full justify-start p-0 h-auto font-normal cursor-pointer"
                >
                  Login
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  onClick={() => app.redirectToSignUp()}
                  variant="ghost"
                  className="w-full justify-start p-0 h-auto font-normal cursor-pointer"
                >
                  Create Account
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
