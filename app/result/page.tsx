"use client"
import { useState, useRef } from "react";
import { usePsyStore } from "@/store/store";
import { resultDescriptions } from "@/store/store";
import { useRouter } from "next/navigation"

export default function Result() {
  const router = useRouter();
  const psyData = usePsyStore( (state)=> state.psyData );
  const resetQuiz = usePsyStore( (state) => state.resetQuiz );
  const resultRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const resultData = psyData.result ? resultDescriptions[psyData.result as keyof typeof resultDescriptions] : null;

  function handleReturnHome(){
    resetQuiz();
    router.push("/");
  }

  async function downloadAsImage() {
    if (!resultRef.current) return;
    
    setIsDownloading(true);
    try {
      // 動態導入 html2canvas
      const html2canvas = (await import('html2canvas')).default;
      
      // 獲取結果卡片區域
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: '#000000',
        scale: 2,
      });
      
      // 轉換為圖片並下載
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `AI溝通師測驗結果_${resultData?.name}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('下載失敗:', error);
      alert('下載失敗，請稍後重試');
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full gap-6 sm:gap-8 p-4 sm:p-6 bg-black overflow-y-auto">
      {/* 結果卡片 */}
      <div 
        ref={resultRef}
        className="bg-transparent border border-white rounded-none p-6 sm:p-8 w-full max-w-sm text-white text-center"
      >
        <div className="text-6xl sm:text-7xl mb-4 sm:mb-6">{resultData?.emoji}</div>
        <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">{resultData?.name}</h2>
        <p className="text-base sm:text-lg font-medium italic mb-4 sm:mb-6 opacity-95">「{resultData?.quote}」</p>
        <p className="text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 px-2">{resultData?.description}</p>
        <div className="flex justify-between items-center text-xs sm:text-sm opacity-90 border-t border-white border-opacity-30 pt-3 sm:pt-4 px-2">
          <span>代表技能：{resultData?.skill}</span>
        </div>
        <div className="text-xs sm:text-sm opacity-90 pt-2">
          {resultData?.extra}
        </div>
      </div>

      {/* 按鈕組 */}
      <div className="flex flex-col gap-4 w-full max-w-sm px-4 sm:px-0">
        <div className="bg-white/5 rounded-lg p-4 sm:p-5 border border-white/20 backdrop-blur-sm transition-all duration-300">
          <button 
            onClick={downloadAsImage}
            disabled={isDownloading}
            className="w-full font-bold text-sm sm:text-base transition-all duration-300 focus:outline-none text-white hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading ? '下載中...' : '下載結果'}
          </button>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4 sm:p-5 border border-white/20 backdrop-blur-sm transition-all duration-300">
          <button 
            onClick={handleReturnHome}
            className="w-full font-bold text-sm sm:text-base transition-all duration-300 focus:outline-none text-white hover:text-blue-300"
          >
            返回首頁
          </button>
        </div>
      </div>

      {/* 分享提示 */}
      <p className="text-gray-400 text-xs sm:text-sm text-center mt-2 sm:mt-4 px-4">
        分享給朋友，看看他們是哪種 AI 溝通師吧！✨
      </p>
    </div>
  );

}