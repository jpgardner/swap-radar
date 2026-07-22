import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Swap Radar — Find the right home exchange",
    template: "%s · Swap Radar",
  },
  description:
    "Compare home exchange, house sitting, and mid-term platforms. Take a 90-second quiz to find your fit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-200 py-8 text-center text-xs text-zinc-500 dark:border-zinc-800">
          <p>
            Affiliate disclosure: we may earn a commission if you join a
            platform through our links. Rankings follow editorial quiz rules, not
            pay-for-placement.
          </p>
          <p className="mt-2">
            Swap Radar is a comparison guide — we don’t host bookings or mirror
            full home catalogs.
          </p>
        </footer>
      </body>
    </html>
  );
}
