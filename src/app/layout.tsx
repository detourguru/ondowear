import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ondowear",
  description: "weather-based outfit recommendation service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"w-screen flex justify-center bg-black"}>
        <div className="max-w-[375px] w-full h-dvh overflow-y-auto overflow-x-hidden hidden-scrollbar bg-primary-50">
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  );
}
