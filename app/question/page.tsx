"use client"

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {useRouter}from 'next/navigation';
import {usePsyStore} from "../../store/store"

  export default function Question() {

    const router = useRouter();

    const psyData = usePsyStore((state)=>state.psyData);

    const [questionIndex, setQuestionIndex] = useState(0);

    console.log(psyData);
    console.log(psyData.quizData);

    useEffect(() =>{
        console.log(psyData.score);
    },[psyData.score]);

    // let questionData = [
    //     {
    //         title:"題目一",
    //         options:[
    //             {
    //                 text:"選項1",
    //                 value:1
    //             },
    //             {
    //                 text:"選項2",
    //                 value:2
    //             },
    //             {
    //                 text:"選項3",
    //                 value:3
    //             }
    //         ]
    //     }
    // ];

    function nextQuestion(optionIndex: any){
        console.log("使用者選擇" + optionIndex);

        usePsyStore.getState().setScore(psyData.score + 1);
        console.log(psyData.score);

        if(questionIndex != psyData.quizData.length - 1){
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
        <div>{ "Q" + (questionIndex+1) + "." + psyData.quizData[questionIndex].title}</div>
        <div onClick={() => nextQuestion(0)}>{ psyData.quizData[questionIndex].options[0].text}</div>
        <div onClick={() => nextQuestion(1)}>{ psyData.quizData[questionIndex].options[1].text}</div>
        <div onClick={() => nextQuestion(2)}>{ psyData.quizData[questionIndex].options[2].text}</div>
        {
            psyData.quizData[questionIndex].options.map(
                (option:any,index:any) => {
                    return(<div onClick ={() =>nextQuestion(index)}>{option.text}</div>)
                }
            )
        }
    </div>

    {/* <Link className = "text-white bg-black px-3 py-2" href="/prepare">準備看結果</Link> */}
    </div>
  );
}


    /*<div>
        <div>{ "Q" + (questionIndex+1) + "." + questionData[questionIndex].title}</div>
        <div>{ questionData[questionIndex].options[0].text}</div>
        <div>{ questionData[questionIndex].options[1].text}</div>
        <div>{ questionData[questionIndex].options[2].text}</div>
    </div>*/