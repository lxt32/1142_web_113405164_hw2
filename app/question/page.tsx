"use client"

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {useRouter}from 'next/navigation';

  export default function Question() {

        const router = useRouter();

    let questionData = [
        {
            title:"題目一",
            options:[
                {
                    text:"選項1",
                    value:1
                },
                {
                    text:"選項2",
                    value:2
                },
                {
                    text:"選項3",
                    value:3
                }
            ]
        }
    ];

    const [questionIndex, setQuestionIndex] = useState(0);

    function nextQuestion(optionIndex: any){
        console.log("使用者選擇" + optionIndex);
        if(questionIndex == questionData.length - 1){
            console.log("下一題");
            setQuestionIndex(questionIndex + 1);
        }
        else{
            console.log("進入準備看結果頁面");
            router.push("/prepare");
        }
    }

  return(
    <div className  = "flex flex-col justify-center items-center gap-4">
    答題

    <div>
        <div>{ "Q" + (questionIndex+1) + "." + questionData[questionIndex].title}</div>
        <div onClick={() => nextQuestion(0)}>{ questionData[questionIndex].options[0].text}</div>
        <div onClick={() => nextQuestion(1)}>{ questionData[questionIndex].options[1].text}</div>
        <div onClick={() => nextQuestion(2)}>{ questionData[questionIndex].options[2].text}</div>
    </div>

    <div>
        <div>{ "Q" + (questionIndex+1) + "." + questionData[questionIndex].title}</div>
        <div>{ questionData[questionIndex].options[0].text}</div>
        <div>{ questionData[questionIndex].options[1].text}</div>
        <div>{ questionData[questionIndex].options[2].text}</div>
    </div>

    <Link className = "text-white bg-black px-3 py-2" href="/prepare">看結果</Link>
    </div>
  );
}