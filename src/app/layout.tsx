import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SwarmID Card Generator",
  description:
    "An swarm-made ID card generator ——— heart /~ Neuro-Sama ~/ heart",
  keywords: [
    "neuro",
    "neuro-sama",
    "evil-neuro",
    "vedal",
    "id card generator",
    "swarm made websites",
    "swarm made",
  ],
  authors: [{ name: "hmr-BH" }],
  icons: {
    icon: "https://hmrbh.cn/img/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
