import Image from "next/image";
import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";

import MobileNav from "./MobileNav";

export default function Navbar() {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link className="flex items-center gap-1" href="/">
        <Image
          className="max-sm:size-10"
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="Yoom Logo"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">Yoom</p>
      </Link>
      <div className="flex-between gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
}
