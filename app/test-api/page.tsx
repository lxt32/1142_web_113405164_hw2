"use client"

export default function Result() {
    useEffect (()=>{

    fetch("http://localhost:3002/id")
    .then(response => response.json())
    .then(data => console.log(data))

    },[]);

    return(
        <>
        test api
        </>
    )
}