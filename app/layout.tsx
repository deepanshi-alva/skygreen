import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import CookieConsent from "@/components/CookieConsent";
import GoogleAnalytics from "@/components/common/GoogleAnalytics";
import GoogleAnalyticsEvents from "@/components/common/GAEvents";
import { Providers } from "./provider"; // 👈 new

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sky Green",
  description:
    "Created by Deepanshi Singhal for more details contact at deepanshisinghal1523@gmail.com",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          <Header />
          {children}
          <GoogleAnalytics />
          <GoogleAnalyticsEvents />
          <CookieConsent />
          <Footer />
          <WhatsAppWidget
            message="Hi SKYGREEN Team, I want details about the new 575W N-Type TOPCon Panels availability."
            bottom={24}
            right={24}
          />
        </Providers>
      </body>
    </html>
  );
}
