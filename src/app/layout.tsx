import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { LoginContextProvider } from "@/repositories/loginContext";
import { JobsContextProvider } from "@/repositories/jobsContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["200", "400", "700"],
});

export const metadata: Metadata = {
  title: 'Guild'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased max-w-[1440px] mx-auto`}>
        <LoginContextProvider>
          <JobsContextProvider>
            <Navbar />
            {children}
          </JobsContextProvider>
        </LoginContextProvider>
      </body>
    </html>
  );
}
