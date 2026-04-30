"use client"

import Link from 'next/link';

import { useState, useEffect } from 'react';


  export default function Home() {

  return(
    <div className  = "flex flex-col justify-center items-center gap-4">
    歡迎！
    <Link className = "text-white bg-black px-3 py-2" href="/question">START</Link>
    </div>
  );
}