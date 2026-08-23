import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../public/colorpalettes/commonpalettes.css";
import { Navbar, Footer } from "./(mainframe)";
import { Banner } from "@/lib/components/banner";

import CombinedProvider from '../lib/redux/combinedprovider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Grateful Glow",
  description: "Grateful Glow body butter collection",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-brand-bg font-sans">
        <CombinedProvider>
        {/* Sticky top header using palette background and border */}
        <header className="sticky top-0 z-50 bg-brand-bg/90 backdrop-blur-md border-b border-brand-border">
          <Banner />
          <Navbar />
        </header>

        <main className="">
          {children}
        </main>

        <Footer />
      </CombinedProvider>

      </body>
    </html>
  );
}