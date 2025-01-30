import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { LoginContextProvider } from "@/serviceProviders/loginContext";
import { JobsContextProvider } from "@/serviceProviders/jobsContext";
import UserDataContextProvider from "@/serviceProviders/userDataContext";
import { MockDatabaseProvider } from "@/serviceProviders/mockDataContext";

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
        <MockDatabaseProvider>
          <LoginContextProvider>
            <JobsContextProvider>
              <UserDataContextProvider>
                <Navbar />
                {children}
              </UserDataContextProvider>
            </JobsContextProvider>
          </LoginContextProvider>
        </MockDatabaseProvider>
      </body>
    </html>
  );
}
