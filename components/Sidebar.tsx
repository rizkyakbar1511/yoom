"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SIDEBAR_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between dark:bg-slate-800 dark:text-white bg-slate-50 text-gray-700 p-6 pt-28  max-sm:hidden lg:w-[264px] shadow dark:shadow-none">
      <section className="flex flex-1 flex-col gap-6">
        <TooltipProvider>
          {SIDEBAR_LINKS.map((link) => {
            const isActive = pathname === link.route || pathname.startsWith("/" + link.route);

            return (
              <Tooltip key={link.label} disableHoverableContent>
                <TooltipTrigger asChild>
                  <Link
                    className={cn("flex gap-4 items-center p-4 rounded-lg justify-start", {
                      "dark:bg-blue-500 bg-gray-800 text-white": isActive,
                    })}
                    href={link.route}
                  >
                    <Image src={link.imgUrl} alt={link.label} width={24} height={24} />
                    <p className="text-lg font-semibold max-lg:hidden">{link.label}</p>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{link.label}</TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </section>
    </aside>
  );
}
