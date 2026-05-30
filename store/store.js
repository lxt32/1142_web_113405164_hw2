// src/store.js
import { create } from 'zustand'

// 人格类型定义
const PERSONALITY_TYPES = {
  engineer: { name: '指令工程師', emoji: '🎯', order: 0 },
  inspiration: { name: '靈感召喚師', emoji: '🎨', order: 1 },
  detective: { name: '數據偵探', emoji: '🔍', order: 2 },
  buddy: { name: 'AI夥伴派', emoji: '☕', order: 3 }
}

// 问题数据 - 每个选项记录加分方式
const questionData = [
  {
    title: "當你要請 AI 幫忙時，通常會？",
    options: [
      {
        text: "詳細描述需求和條件",
        scores: { engineer: 3, detective: 1, inspiration: 0, buddy: 0 }
      },
      {
        text: "先丟一個想法讓AI自由發揮",
        scores: { inspiration: 3, buddy: 1, engineer: 0, detective: 0 }
      },
      {
        text: "提供相關資料請AI分析",
        scores: { detective: 3, engineer: 1, inspiration: 0, buddy: 0 }
      },
      {
        text: "想到什麼直接問",
        scores: { buddy: 3, inspiration: 1, engineer: 0, detective: 0 }
      }
    ]
  },
  {
    title: "你最常用 AI 做什麼？",
    options: [
      {
        text: "撰寫特定內容",
        scores: { engineer: 3, inspiration: 1, detective: 0, buddy: 0 }
      },
      {
        text: "發想創意點子",
        scores: { inspiration: 3, buddy: 1, engineer: 0, detective: 0 }
      },
      {
        text: "整理與查找資訊",
        scores: { detective: 3, engineer: 1, inspiration: 0, buddy: 0 }
      },
      {
        text: "處理生活瑣事",
        scores: { buddy: 3, detective: 1, engineer: 0, inspiration: 0 }
      }
    ]
  },
  {
    title: "AI 給出的結果不理想時，你會？",
    options: [
      {
        text: "修改提示詞再試一次",
        scores: { engineer: 3, detective: 1, inspiration: 0, buddy: 0 }
      },
      {
        text: "罵AI",
        scores: { buddy: 2, inspiration: 2, engineer: 0, detective: 0 }
      },
      {
        text: "指出問題和AI討論",
        scores: { detective: 3, engineer: 1, inspiration: 0, buddy: 0 }
      },
      {
        text: "直接重新問一次",
        scores: { buddy: 3, inspiration: 1, engineer: 0, detective: 0 }
      }
    ]
  },
  {
    title: "如果 AI 是你的同事，你希望它？",
    options: [
      {
        text: "精準執行任務",
        scores: { engineer: 3, detective: 1, inspiration: 0, buddy: 0 }
      },
      {
        text: "提供創意靈感",
        scores: { inspiration: 3, buddy: 1, engineer: 0, detective: 0 }
      },
      {
        text: "協助分析資料",
        scores: { detective: 3, engineer: 1, inspiration: 0, buddy: 0 }
      },
      {
        text: "分擔工作壓力",
        scores: { buddy: 3, inspiration: 1, engineer: 0, detective: 0 }
      }
    ]
  }
];

// 结果描述
const resultDescriptions = {
  engineer: {
    name: "🎯 指令工程師",
    emoji: "🎯",
    quote: "「不會問問題的人，才會覺得 AI 不好用。」",
    description: "你相信精準的提示詞是成功的關鍵。你的提示詞可能比作文還長，會把需求、格式、限制條件交代得清清楚楚。AI 在你手上就像高階工具，總能產出符合需求的成果。",
    skill: "Prompt Engineering",
    extra: "危險程度：★★★★★",
    color: "from-blue-400 to-blue-500"
  },
  inspiration: {
    name: "🎨 靈感召喚師",
    emoji: "🎨",
    quote: "「想到什麼就問什麼，最後通常會很離譜。」",
    description: "你把 AI 當成腦力激盪夥伴。你最喜歡問一些天馬行空的問題，例如：「如果貓咪統治世界會怎樣？」「把三國演義寫成戀愛遊戲。」你和 AI 的對話常常越聊越離譜，但也因此產生許多有趣點子。",
    skill: "創意爆發",
    extra: "腦洞指數：∞",
    color: "from-pink-400 to-pink-500"
  },
  detective: {
    name: "🔍 數據偵探",
    emoji: "🔍",
    quote: "「相信 AI 前，先查資料再說。」",
    description: "你對 AI 的第一反應不是相信，而是驗證。看到回答後會開始：查資料、比對來源、追問細節、找邏輯漏洞。你把 AI 當研究助理，而不是萬事通。",
    skill: "資訊分析",
    extra: "查證慾望：★★★★★",
    color: "from-green-400 to-green-500"
  },
  buddy: {
    name: "☕ AI夥伴派",
    emoji: "☕",
    quote: "「哎呀，又問了一個無聊的問題。」",
    description: "你和 AI 的關係最像朋友。你會：問今天吃什麼、問作業怎麼寫、問感情問題、問明天天氣。甚至會對 AI 說謝謝、晚安。你不追求最完美答案，而是享受隨時有人能陪你聊天和解決問題。",
    skill: "生活應用",
    extra: "AI 好感度：100%",
    color: "from-amber-400 to-amber-500"
  }
};

// 建立 store hook
const usePsyStore = create((set) => ({
  // states
  psyData: {
    scores: {
      engineer: 0,
      inspiration: 0,
      detective: 0,
      buddy: 0
    },
    quizData: questionData,
    result: null
  },
  
  // actions
  addScore: (personality, points) => 
    set((state) => ({
      psyData: {
        ...state.psyData,
        scores: {
          ...state.psyData.scores,
          [personality]: state.psyData.scores[personality] + points
        }
      }
    })),
  
  calculateResult: () =>
    set((state) => {
      const scores = state.psyData.scores;
      const maxScore = Math.max(...Object.values(scores));
      const resultType = Object.keys(scores).find(key => scores[key] === maxScore);
      return {
        psyData: {
          ...state.psyData,
          result: resultType
        }
      };
    }),
  
  resetQuiz: () =>
    set(() => ({
      psyData: {
        scores: {
          engineer: 0,
          inspiration: 0,
          detective: 0,
          buddy: 0
        },
        quizData: questionData,
        result: null
      }
    }))
}))

export { usePsyStore, PERSONALITY_TYPES, resultDescriptions }