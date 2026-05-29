"use client"
import {useState} from "react";
import {useEffect} from "react";

export default function Emoticons({children}:{children:React.ReactNode}){

    const emoticons = ["(*^_^*)","^_^","φ(゜▽゜*)♪"];
    const [currentEmo, setCurrentEmo] = useState(0);

    const face = ["O_O","U_U"];
    const [currentFace, setCurrentFace] = useState(0);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
       setTimeout(()=>{
        console.log("10s");
       },10000);
       
       setInterval(()=>{
        if(counter % 5 == 0){
            setCurrentFace(1);
        }else{
            setCurrentFace(0);
        }
        console.log(counter);
        //為何counter會一直是零？因為counter的值在setInterval裡面是閉包的，所以每次setCounter(counter + 1)時，counter的值都是初始值0，所以counter一直是0。要解決這個問題，可以使用函數式更新來獲取最新的counter值
        setCounter(counter + 1);
       },1000);
    },[]);

    return(
        <>
        {children}
        {emoticons[0]}
        {emoticons[1]}
        {emoticons[2]}
        </>
    );
} 