import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import Loader from "@/components/Loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jm Laster D. Minguito",
  description:
    "Portfolio of Jm Laster D. Minguito — IT Student & Developer.",
  icons: { icon: "/profile.jpg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-[var(--color-bg)] text-[var(--color-text)] overflow-x-hidden">
        <Loader />
        <Navbar />
        <ScrollRevealProvider>
          <main>{children}</main>
        </ScrollRevealProvider>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
