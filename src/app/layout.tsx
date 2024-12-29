import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const inter = Inter({ 
  variable: "--font-inter",
  subsets: ['latin'],
  weight: ['200', '700']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased max-w-[1440px] mx-auto`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
