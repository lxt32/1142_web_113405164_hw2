"use client"

import Link from 'next/link';
import { useState } from 'react';


  export default function Home() {
    const [isAnimating, setIsAnimating] = useState(false);

  return(
    <div className="flex flex-col justify-center items-center h-screen w-full gap-6 p-4 sm:p-6 bg-gray-950 relative">
      
      {/* 標題 */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3">
          你是哪種類型的 AI 溝通師？
        </h1>
        <p className="text-gray-300 text-base sm:text-lg mb-1 sm:mb-2">
          4 個問題，測出你與 AI 的相處模式！
        </p>
      </div>

      {/* 開始按鈕 */}
      <Link 
        href="/question"
        className="mt-6 sm:mt-8 px-8 sm:px-12 py-3 sm:py-4 border border-white text-white font-bold text-base sm:text-lg rounded-none hover:scale-110 transition-all duration-300 transform hover:bg-white hover:bg-opacity-10"
        onMouseEnter={() => setIsAnimating(true)}
        onMouseLeave={() => setIsAnimating(false)}
      >
        開始測驗 → 
      </Link>

      {/* 底部提示 */}
      <p className="text-gray-400 text-xs sm:text-sm text-center mt-6 sm:mt-8 max-w-sm px-4">
        準備好了嗎？讓我們開始一個有趣的旅程，發現你與 AI 相處的方式！
      </p>
    </div>
  );
}