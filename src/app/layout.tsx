import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { cn } from "@utils/cn";

import Providers from "./providers";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce Shop",
  description: "E-Commerce Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased min-h-screen")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
