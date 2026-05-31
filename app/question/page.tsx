"use client"

import Link from 'next/link';
import { useState } from 'react';
import {useRouter}from 'next/navigation';
import {usePsyStore} from "../../store/store"

  export default function Question() {

    const router = useRouter();

    const psyData = usePsyStore((state)=>state.psyData);
    const addScore = usePsyStore((state)=>state.addScore);
    const calculateResult = usePsyStore((state)=>state.calculateResult);

    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    function nextQuestion(optionIndex: number){
      const option = psyData.quizData[questionIndex].options[optionIndex];
      
      setSelectedOption(optionIndex);
      setIsAnimating(true);

      setTimeout(() => {
        // 根據選項的計分規則加分
        Object.entries(option.scores).forEach(([personality, points]) => {
          const scorePoints = points as number;
          if (scorePoints > 0) {
            addScore(personality, scorePoints);
          }
        });

        if(questionIndex !== psyData.quizData.length - 1){
          setQuestionIndex(questionIndex + 1);
          setSelectedOption(null);
          setIsAnimating(false);
        }
        else{
          // 計算最終結果並跳轉到準備頁面
          calculateResult();
          setTimeout(() => {
            router.push("/prepare");
          }, 300);
        }
      }, 400);
    }

    function previousQuestion(){
      setQuestionIndex(questionIndex - 1);
      setSelectedOption(null);
    }

    const progressPercentage = (questionIndex / psyData.quizData.length) * 100;

  return(
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center bg-[#030712] text-white overflow-hidden font-sans p-6 sm:p-12">
      
      {/* 背景裝飾：科技感環境光與網格 */}
      <div className="absolute inset-0 z-0">
        {/* 背景科幻網格 */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        {/* 左上與右下的霓虹漸層發光球 */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-500/10 rounded-full blur-[120px]"></div>
      </div>

      {/* 頂部進度條區域 */}
      <div className="w-full max-w-3xl z-10 flex flex-col gap-3 mt-4">
        <div className="flex justify-between items-center text-xs tracking-widest text-gray-400 font-mono">
          <span>QUESTION {questionIndex + 1} / {psyData.quizData.length}</span>
          <span className="text-indigo-400 font-bold">{Math.round(progressPercentage)}% COMPLETE</span>
        </div>
        {/* 流線型科技感進度條 */}
        <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden border border-gray-800/50">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 shadow-[0_0_12px_rgba(99,102,241,0.5)] transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* 主體：題目與選項區 */}
      <div className="w-full max-w-2xl z-10 flex flex-col my-auto py-8">
        {/* 題目 */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center tracking-wide mb-12 leading-snug">
          {psyData.quizData[questionIndex].title.split('？')[0]}<span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">？</span>
        </h2>

        {/* 選項清單 */}
        <div className="flex flex-col gap-4">
          {
            psyData.quizData[questionIndex].options.map(
              (option:any, index:number) => {
                const isSelected = selectedOption === index;
                const isAnswered = selectedOption !== null;
                
                return(
                  <button
                    key={index}
                    onClick={() => !isAnimating && nextQuestion(index)}
                    disabled={isAnimating}
                    className={`
                      group w-full flex items-center gap-4 p-4 sm:p-5 rounded-xl text-left font-medium tracking-wide
                      transition-all duration-300 backdrop-blur-md border
                      ${isSelected 
                        ? 'bg-indigo-600/20 border-indigo-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.2)]' 
                        : isAnswered
                        ? 'bg-white/[0.02] border-white/[0.06] text-gray-500 cursor-not-allowed opacity-50'
                        : 'bg-white/[0.02] border-white/[0.06] hover:border-white/20 hover:bg-white/[0.05] text-gray-300 hover:text-white'
                      }
                      ${isAnimating && !isSelected ? 'cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    {/* 標號 (A, B, C, D) 小方塊 */}
                    <div className={`
                      flex items-center justify-center w-8 h-8 rounded-lg font-mono text-sm font-bold transition-all duration-300 flex-shrink-0
                      ${isSelected 
                        ? 'bg-indigo-500 text-white shadow-[0_0_10px_rgba(99,102,241,0.5)]' 
                        : isAnswered
                        ? 'bg-white/5 border border-white/10 text-gray-600'
                        : 'bg-white/5 border border-white/10 text-gray-400 group-hover:text-white group-hover:border-white/30'
                      }
                    `}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    
                    {/* 選項文字 */}
                    <span className="text-base sm:text-lg">{option.text}</span>
                  </button>
                )
              }
            )
          }
        </div>

        {/* 上一題按鈕 */}
        {questionIndex > 0 && (
          <button 
            onClick={previousQuestion}
            className="mt-8 self-center flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-400 transition-colors duration-300 tracking-wider"
          >
            <span>←</span> 上一題
          </button>
        )}
      </div>

      {/* 底部提示文字 */}
      <div className="w-full z-10 text-center mb-4">
        <p className="text-xs tracking-widest text-gray-600 uppercase animate-pulse">
          選擇一個選項以繼續測驗
        </p>
      </div>

    </div>
  );
}


    /*<div>
        <div>{ "Q" + (questionIndex+1) + "." + questionData[questionIndex].title}</div>
        <div>{ questionData[questionIndex].options[0].text}</div>
        <div>{ questionData[questionIndex].options[1].text}</div>
        <div>{ questionData[questionIndex].options[2].text}</div>
    </div>*/