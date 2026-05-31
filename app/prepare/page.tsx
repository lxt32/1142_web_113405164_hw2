"use client"

import Link from 'next/link';
import { useState, useEffect } from 'react';

const funMessages = [
  "正在分析你的 AI 溝通風格...",
  "研究你的互動方式中...",
  "與 AI 配對中...",
  "準備驚人結果...",
];

export default function Prepare() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % funMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return(
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#030712] text-white overflow-hidden font-sans p-6 sm:p-12">
      
      {/* 背景裝飾 */}
      <div className="absolute inset-0 z-0">
        {/* 背景科幻網格 */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        {/* 霓虹漸層發光球 */}
        <div className="absolute top-[-20%] left-[-15%] w-[50vw] h-[50vw] bg-indigo-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-15%] right-[-10%] w-[45vw] h-[45vw] bg-purple-500/10 rounded-full blur-[120px]"></div>
      </div>

      {/* 主體內容 */}
      <div className="w-full max-w-2xl z-10 flex flex-col items-center justify-center py-12">
        {/* 標題 */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center tracking-wide mb-6">
          正在準備結果...
        </h1>
        
        {/* 動態文字 */}
        <p className="text-gray-400 text-lg sm:text-xl tracking-wide text-center mb-12 min-h-8">
          {funMessages[messageIndex]}
        </p>

        {/* 加載動畫 */}
        <div className="flex gap-4 mb-12">
          <div className="w-4 h-4 bg-indigo-500 rounded-lg animate-bounce shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{animationDelay: '0s'}}></div>
          <div className="w-4 h-4 bg-indigo-400 rounded-lg animate-bounce shadow-[0_0_10px_rgba(99,102,241,0.4)]" style={{animationDelay: '0.2s'}}></div>
          <div className="w-4 h-4 bg-indigo-500 rounded-lg animate-bounce shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{animationDelay: '0.4s'}}></div>
        </div>

        {/* 按鈕 */}
        <Link 
          href="/result"
          className={`
            group flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg
            transition-all duration-300 backdrop-blur-md border tracking-wide
            bg-white/[0.02] border-white/[0.06] hover:border-white/20 hover:bg-indigo-600/20
            text-white hover:text-cyan-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]
          `}
        >
          看結果
          <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
        </Link>
      </div>

      {/* 底部提示 */}
      <div className="absolute bottom-6 sm:bottom-12 w-full z-10 text-center">
        <p className="text-xs tracking-widest text-gray-600 uppercase animate-pulse">
          即將揭曉你的 AI 溝通師類型...
        </p>
      </div>

    </div>
  );
}