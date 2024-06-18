"use client";

import Image from "next/image";
import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import MobileNav from "./MobileNav";

export default function Navbar() {
  const { setTheme } = useTheme();

  return (
    <nav className="flex-between fixed z-50 w-full dark:bg-slate-800 dark:shadow-none bg-slate-50 shadow px-6 py-4 lg:px-10">
      <Link className="flex items-center gap-1" href="/">
        <Image
          className="max-sm:size-10"
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="Yoom Logo"
        />
        <p className="text-[26px] font-extrabold dark:text-white text-gray-700 max-sm:hidden">
          Yoom
        </p>
      </Link>
      <div className="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="dark:bg-gray-900" asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dark:bg-gray-900" align="end">
            <DropdownMenuItem className="dark:hover:bg-slate-800" onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem className="dark:hover:bg-slate-800" onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem
              className="dark:hover:bg-slate-800"
              onClick={() => setTheme("system")}
            >
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex-between gap-5">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
