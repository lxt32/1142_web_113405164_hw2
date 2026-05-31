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
      <body className="h-full flex justify-center w-full bg-black relative overflow-hidden">
        {/* 浮動泡泡背景 */}
        <div className="floating-bubble"></div>
        <div className="floating-bubble"></div>
        <div className="floating-bubble"></div>
        <div className="floating-bubble"></div>
        
        <div className="w-full h-full overflow-hidden relative z-10">
          {children}
        </div>

      </body>
    </html>
  );
}
