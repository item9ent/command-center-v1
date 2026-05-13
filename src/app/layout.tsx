import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "ENHAZED OS",
  description: "Operating platform for your business",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ENHAZED OS",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans dark h-full antialiased bg-black", geist.variable)}>
      <body className="min-h-full bg-black text-white flex flex-col">{children}</body>
    </html>
  );
}
