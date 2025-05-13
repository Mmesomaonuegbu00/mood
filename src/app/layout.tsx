import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { AuthProvider } from "./providers/AuthProvider"; // Replace with the correct path
import { ConvexClientProvider } from "./ConvexClientProvider";
import AuthWrapper from "@/components/AuthWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mood Tracker | Elevate Your State of Mind",
  description: "Discover a personalized way to track and improve your mood with insights and recommendations.",
  openGraph: {
    title: "Mood Tracker | Elevate Your State of Mind",
    description: "Discover a personalized way to track and improve your mood with insights and recommendations.",
    images: ['/tr1.png'], // Replace with your actual image URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="keywords" content="mood, mood tracker, emotions, mental health, wellness" />
        <meta property="og:title" content="Mood Tracker | Elevate Your State of Mind" />
        <meta property="og:description" content="Discover a personalized way to track and improve your mood with insights and recommendations." />
        <meta property="og:image" content="/your-image.jpg" />
        <link rel="icon" href="/tr1.png" type="image/x-icon" />
      </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <AuthProvider>
            <ConvexClientProvider>
              <AuthWrapper>
                {children}
              </AuthWrapper>
            </ConvexClientProvider>
          </AuthProvider>
        </body>
    </html>
  );
}