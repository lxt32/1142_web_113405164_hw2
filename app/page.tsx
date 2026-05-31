"use client"

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full gap-6 p-4 sm:p-6 bg-black text-white selection:bg-white/20">
      
      {/* 標題區域 */}
      <div className="text-center w-full max-w-2xl px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider text-white mb-4">
          你是哪種類型的 AI 溝通師？
        </h1>
        <p className="text-gray-400 text-base sm:text-lg md:text-xl font-light">
          4 個問題，測出你與 AI 的相處模式！
        </p>
      </div>

      {/* 開始按鈕 */}
      <div className="bg-white/5 rounded-lg border border-white/20 backdrop-blur-sm transition-all duration-300 mt-8 sm:mt-10">
        <Link 
          href="/question"
          className="block px-8 sm:px-12 py-6 sm:py-8 font-bold text-base sm:text-lg transition-all duration-300 text-white hover:text-blue-300"
          onMouseEnter={() => setIsAnimating(true)}
          onMouseLeave={() => setIsAnimating(false)}
        >
          開始測驗 → 
        </Link>
      </div>

      {/* 底部提示 */}
      <p className="text-gray-500 text-xs sm:text-sm text-center mt-8 sm:mt-12 max-w-md px-6 font-light leading-relaxed">
        準備好了嗎？讓我們開始一個有趣的旅程，發現你與 AI 相處的方式！
      </p>
    </div>
  );
}