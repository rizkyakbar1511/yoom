"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SIDEBAR_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <section className="flex flex-1 flex-col gap-6">
        {SIDEBAR_LINKS.map((link) => {
          const isActive = pathname === link.route || pathname.startsWith("/" + link.route);

          return (
            <Link
              className={cn("flex gap-4 items-center p-4 rounded-lg justify-start", {
                "bg-blue-1": isActive,
              })}
              key={link.label}
              href={link.route}
            >
              <Image src={link.imgUrl} alt={link.label} width={24} height={24} />
              <p className="text-lg font-semibold max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </section>
    </aside>
  );
}
