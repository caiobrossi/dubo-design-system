import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Open_Sans, Poppins } from "next/font/google";
import { SiteShell } from "@/components/layout/site-shell";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Dubo Design System",
    template: "%s | Dubo Design System",
  },
  description: "Public foundations, tokens and component documentation for the Dubo design system.",
  metadataBase: new URL("https://design.dubo.pt"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-body-md focus:focus:text-white"
          >
            Skip to content
          </a>
          <SiteShell>{children}</SiteShell>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
