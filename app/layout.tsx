import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "你是哪種類型的 AI 溝通師？",
  description: "4 個問題，測出你與 AI 的相處模式！",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full flex justify-center w-full bg-gray-900 relative">
        <div className="absolute inset-0 bg-black opacity-40 pointer-events-none" />
        <div className="border border-gray-700 w-full h-full sm:max-w-[480px] sm:h-screen shadow-2xl bg-gray-950 overflow-hidden relative z-10">
          {children}
        </div>

      </body>
    </html>
  );
}
