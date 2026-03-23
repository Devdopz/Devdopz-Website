import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-devdopz-sans",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-devdopz-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteTitle = "Devdopz | Developer Organization";
const siteDescription =
  "Devdopz is a modern developer organization that started in 2024 and grew into an organized builder community in 2026.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: "/Logo.jpg",
    shortcut: "/Logo.jpg",
    apple: "/Logo.jpg",
  },
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${plexMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
