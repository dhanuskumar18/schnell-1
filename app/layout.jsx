import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import StickyHeader from "@/Three/components/StickyHeader";
import ParallaxFooter from "@/Three/components/ParallaxFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata = {
  title: "Schnell Energy",
  description: "Modern energy solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased bg-white`}
      >
        <StickyHeader />

        {/* Main Content */}
        <main className="pt-20">{children}</main>
        
      </body>
    </html>
  );
}
