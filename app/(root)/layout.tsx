import StreamVideoProvider from "@/providers/StreamClientProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YOOM",
  description: "Meeting App",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
}
