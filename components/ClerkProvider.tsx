"use client";

import { ClerkProvider as Clerk } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function ClerkProvider({ children }: { children: React.ReactNode }) {
  const { theme, resolvedTheme } = useTheme();
  return (
    <Clerk
      appearance={{
        ...(resolvedTheme === "dark" && { baseTheme: dark }),
        layout: {
          logoImageUrl: "/icons/yoom-logo.svg",
          socialButtonsVariant: "iconButton",
        },
      }}
    >
      {children}
    </Clerk>
  );
}
