"use client"

import Link from 'next/link';
import { useState } from 'react';


  export default function Prepare() {
    const [isLoading, setIsLoading] = useState(false);

  return(
    <div className="flex flex-col justify-center items-center h-screen w-full gap-6 sm:gap-8 p-4 sm:p-6 bg-black">
      {/* 標題 */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">
          正在準備結果...
        </h1>
        <p className="text-gray-300 text-base sm:text-lg">
          讓我為你找出你的 AI 溝通類型
        </p>
      </div>

      {/* 加載動畫 */}
      <div className="flex gap-2">
        <div className="w-3 h-3 bg-white rounded-none animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="w-3 h-3 bg-white rounded-none animate-bounce" style={{animationDelay: '0.2s'}}></div>
        <div className="w-3 h-3 bg-white rounded-none animate-bounce" style={{animationDelay: '0.4s'}}></div>
      </div>

      {/* 按鈕 */}
      <div className="bg-white/5 rounded-lg p-4 sm:p-5 border border-white/20 backdrop-blur-sm transition-all duration-300 mt-6 sm:mt-8">
        <Link 
          href="/result"
          className="block font-bold text-base sm:text-lg transition-all duration-300 text-white hover:text-blue-300"
        >
          看結果！ →
        </Link>
      </div>
    </div>
  );
}