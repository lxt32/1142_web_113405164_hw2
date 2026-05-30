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
          // 計算最終結果並跳轉
          calculateResult();
          setTimeout(() => {
            router.push("/result");
          }, 300);
        }
      }, 400);
    }

    const progressPercentage = ((questionIndex + 1) / psyData.quizData.length) * 100;

  return(
    <div className="flex flex-col h-screen w-full bg-gray-950 p-4 sm:p-6 relative">
      {/* 進度條 */}
      <div className="mb-6 sm:mb-8">
        <div className="flex justify-between items-center mb-2 sm:mb-3">
          <h2 className="text-base sm:text-lg font-semibold text-white">
            Q<span className="text-blue-300 font-bold">{questionIndex + 1}</span>/{psyData.quizData.length}
          </h2>
          <span className="text-xs sm:text-sm text-gray-300 font-medium">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 sm:h-2.5 overflow-hidden">
          <div 
            className="bg-white h-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* 問題區域 */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 leading-relaxed px-2">
            {psyData.quizData[questionIndex].title}
          </h1>
        </div>

        {/* 選項按鈕 */}
        <div className="w-full max-w-md space-y-10 sm:space-y-12 px-4 sm:px-0">
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
                      w-full p-6 sm:p-7 rounded-none font-medium text-base sm:text-lg transition-all duration-300 transform
                      ${isSelected 
                        ? 'bg-white bg-opacity-20 border border-white text-white' 
                        : isAnswered
                        ? 'bg-transparent border border-gray-600 text-gray-500 cursor-not-allowed opacity-50'
                        : 'bg-transparent border border-white text-white hover:border-white hover:bg-white hover:bg-opacity-10'
                      }
                      ${isAnimating && !isSelected ? 'cursor-not-allowed' : 'cursor-pointer'}
                      focus:outline-none
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full border border-current text-current font-bold text-sm flex-shrink-0">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-left break-words">{option.text}</span>
                    </div>
                  </button>
                )
              }
            )
          }
        </div>
      </div>

      {/* 底部提示 */}
      <div className="text-center text-xs sm:text-sm text-gray-400 mt-6 sm:mt-8">
        選擇一個選項繼續
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