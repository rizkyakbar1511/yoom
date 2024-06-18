"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SIDEBAR_LINKS } from "@/constants";

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <aside className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            className="cursor-pointer sm:hidden"
            src="/icons/hamburger.svg"
            width={36}
            height={36}
            alt="Hamburger Icon"
          />
        </SheetTrigger>
        <SheetContent className="border-none bg-dark-1" side="left">
          <Link className="flex items-center gap-1" href="/">
            <Image
              className="max-sm:size-10"
              src="/icons/logo.svg"
              width={32}
              height={32}
              alt="Yoom Logo"
            />
            <p className="text-[26px] font-extrabold text-white">Yoom</p>
          </Link>
          <div className="flex h-[calc(100vh - 72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-6 pt-16 text-white">
                {SIDEBAR_LINKS.map((link) => {
                  const isActive = pathname === link.route || pathname.startsWith("/" + link.route);

                  return (
                    <SheetClose asChild key={link.route}>
                      <Link
                        className={cn("flex gap-4 items-center p-4 rounded-lg w-full max-w-60", {
                          "bg-blue-1": isActive,
                        })}
                        key={link.label}
                        href={link.route}
                      >
                        <Image src={link.imgUrl} alt={link.label} width={20} height={20} />
                        <p className="font-semibold">{link.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </aside>
  );
}
