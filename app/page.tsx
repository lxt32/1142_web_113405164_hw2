"use client"

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
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
      <div className="w-full max-w-3xl z-10 flex flex-col items-center justify-center py-12">
        {/* 標題 */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center tracking-wide mb-6 leading-snug md:whitespace-nowrap">
          你是哪種類型的 <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">AI 溝通師</span>？
        </h1>
        
        {/* 副標題 */}
        <p className="text-gray-400 text-base sm:text-lg tracking-wide text-center mb-12">
          4 個問題，測出你與 AI 的相處模式！
        </p>

        {/* 開始按鈕 */}
        <Link 
          href="/question"
          className={`
            group flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg
            transition-all duration-300 backdrop-blur-md border tracking-wide
            bg-white/[0.02] border-white/[0.06] hover:border-white/20 hover:bg-indigo-600/20
            text-white hover:text-cyan-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]
          `}
          onMouseEnter={() => setIsAnimating(true)}
          onMouseLeave={() => setIsAnimating(false)}
        >
          開始測驗 
          <span className={`transition-transform duration-300 ${isAnimating ? 'translate-x-2' : ''}`}>→</span>
        </Link>
      </div>

      {/* 底部提示 */}
      <div className="absolute bottom-6 sm:bottom-12 w-full z-10 text-center">
        <p className="text-xs tracking-widest text-gray-600 uppercase animate-pulse">
          準備好發現你的 AI 溝通類型了嗎？
        </p>
      </div>

    </div>
  );
}