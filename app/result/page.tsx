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
    if (!resultData) {
      alert('結果數據未加載');
      return;
    }
    
    setIsDownloading(true);
    try {
      // 動態導入 html2canvas
      const html2canvas = (await import('html2canvas')).default;
      
      // 建立一個簡單的臨時元素
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'fixed';
      tempContainer.style.top = '-9999px';
      tempContainer.style.left = '-9999px';
      tempContainer.style.width = '600px';
      tempContainer.style.backgroundColor = '#000000';
      tempContainer.style.padding = '20px';
      tempContainer.style.fontFamily = 'Arial, sans-serif';
      tempContainer.style.color = 'white';
      tempContainer.style.boxSizing = 'border-box';
      
      // 內容
      tempContainer.innerHTML = `
        <div style="background-color: rgba(0, 0, 0, 0.5); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 12px; padding: 32px; text-align: center; color: white;">
          <div style="font-size: 80px; margin-bottom: 16px; line-height: 1;">${resultData.emoji}</div>
          <h2 style="font-size: 30px; font-weight: bold; margin: 0 0 16px 0; color: white;">${resultData.name}</h2>
          <p style="font-size: 14px; font-weight: 500; font-style: italic; margin: 0 0 16px 0; color: #d1d5db;">「${resultData.quote}」</p>
          <p style="font-size: 14px; line-height: 1.5; margin: 0 0 16px 0; color: #d1d5db;">${resultData.description}</p>
          <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 16px; margin-top: 16px; text-align: left;">
            <div style="font-size: 12px; color: #9ca3af; margin-bottom: 8px;"><span style="color: #a78bfa; font-weight: 600;">代表技能：</span>${resultData.skill}</div>
            <div style="font-size: 11px; color: #6b7280;">${resultData.extra}</div>
          </div>
        </div>
      `;
      
      document.body.appendChild(tempContainer);
      
      // 使用 html2canvas 導出圖片 - 禁用所有樣式表
      const styleSheets = document.querySelectorAll('style, link[rel="stylesheet"]');
      const originalDisabled: boolean[] = [];
      
      styleSheets.forEach((sheet, index) => {
        if ('sheet' in sheet) {
          originalDisabled[index] = (sheet as any).sheet.disabled;
          (sheet as any).sheet.disabled = true;
        }
      });
      
      const canvas = await html2canvas(tempContainer, {
        backgroundColor: '#000000',
        scale: 2,
        logging: false,
        allowTaint: true,
        useCORS: true
      });
      
      // 恢復樣式表
      styleSheets.forEach((sheet, index) => {
        if ('sheet' in sheet) {
          (sheet as any).sheet.disabled = originalDisabled[index];
        }
      });
      
      // 移除臨時元素
      document.body.removeChild(tempContainer);
      
      // 下載圖片
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `AI溝通師測驗結果_${resultData.name}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert('下載成功！');
    } catch (error) {
      console.error('下載失敗:', error);
      alert('下載失敗：' + (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsDownloading(false);
    }
  }

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
      <div className="w-full max-w-2xl z-10 flex flex-col items-center justify-center py-8">
        {/* 結果卡片 */}
        <div 
          ref={resultRef}
          className="bg-white/[0.02] border border-indigo-500/30 rounded-xl p-8 sm:p-10 w-full text-white text-center mb-16 backdrop-blur-md"
        >
          <div className="text-7xl sm:text-8xl mb-6 text-current" style={{ color: 'unset' }}>{resultData?.emoji}</div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {resultData?.name}
          </h2>
          <p className="text-lg sm:text-xl font-medium italic mb-6 text-gray-300">
            「{resultData?.quote}」
          </p>
          <p className="text-base sm:text-lg leading-relaxed mb-6 text-gray-300">
            {resultData?.description}
          </p>
          <div className="border-t border-white/10 pt-4 space-y-2">
            <div className="text-sm sm:text-base text-gray-400">
              <span className="text-indigo-400 font-semibold">代表技能：</span>{resultData?.skill}
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              {resultData?.extra}
            </div>
          </div>
        </div>

        <br />

        {/* 按鈕組 */}
        <div className="flex flex-col gap-4 w-full">
          <button 
            onClick={downloadAsImage}
            disabled={isDownloading}
            className={`
              group flex items-center justify-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg
              transition-all duration-300 backdrop-blur-md border tracking-wide
              ${isDownloading 
                ? 'bg-white/[0.02] border-white/[0.06] text-gray-500 cursor-not-allowed opacity-50'
                : 'bg-white/[0.02] border-white/[0.06] hover:border-white/20 hover:bg-indigo-600/20 text-white hover:text-cyan-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]'
              }
            `}
          >
            {isDownloading ? '下載中...' : '下載結果'}
          </button>
          
          <button 
            onClick={handleReturnHome}
            className={`
              group flex items-center justify-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg
              transition-all duration-300 backdrop-blur-md border tracking-wide
              bg-white/[0.02] border-white/[0.06] hover:border-white/20 hover:bg-indigo-600/20
              text-white hover:text-cyan-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]
            `}
          >
            返回首頁
          </button>
        </div>
      </div>

      {/* 底部提示 */}
      <div className="absolute bottom-6 sm:bottom-12 w-full z-10 text-center">
        <p className="text-xs tracking-widest text-gray-600 uppercase animate-pulse">
          分享給朋友，看看他們是哪種類型的 AI 溝通師！
        </p>
      </div>

    </div>
  );

}