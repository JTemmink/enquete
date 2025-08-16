import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
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
  title: "Bakker aan de Deur - Enquête",
  description: "Enquête voor thuisgebracht ontbijt, brunch of lunch van de bakker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-primaryBg min-h-screen flex flex-col items-center justify-center`}
      >
        <div className="w-full max-w-md mx-auto p-4">
          <div className="flex justify-center mb-6">
            <Image 
              src="/images/bakkeraandedeurlogo.png" 
              alt="Bakker aan de Deur Logo" 
              width={200} 
              height={100}
              className="mb-4"
            />
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
