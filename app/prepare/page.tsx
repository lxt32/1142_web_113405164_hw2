"use client"

import Link from 'next/link';
import { useState } from 'react';


  export default function Prepare() {
    const [isLoading, setIsLoading] = useState(false);

  return(
    <div className="flex flex-col justify-center items-center h-screen w-full gap-6 sm:gap-8 p-4 sm:p-6 bg-gray-950">
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
        <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
      </div>

      {/* 按鈕 */}
      <Link 
        href="/result"
        className="mt-6 sm:mt-8 px-6 sm:px-8 py-2 sm:py-3 border border-white text-white font-bold text-base sm:text-lg rounded-none hover:scale-105 transition-all duration-300 hover:bg-white hover:bg-opacity-10"
      >
        看結果！ →
      </Link>
    </div>
  );
}