'use client'
// src/context/MyContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

// 定义上下文的值的类型
interface MyContextType {
  data: any | null
  setData: (data: any | null) => void
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
  time: number
  setTime: (time: number) => void
  stepTime: number
  setStepTime: (stepTime: number) => void
  isDark: boolean
  setIsDark: (isDark: boolean) => void
}

// 创建上下文，指定默认值
const MyContext = createContext<MyContextType | undefined>(undefined)

export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<any | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [stepTime, setStepTime] = useState(0)
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    if (!window) return
    const dark = localStorage?.theme ? localStorage.theme === 'dark' : window?.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(dark)
  }, [])

  return (
    <MyContext.Provider value={{ data, setData, isPlaying, setIsPlaying, time, setTime, stepTime, setStepTime, isDark, setIsDark }}>
      {children}
    </MyContext.Provider>
  )
}

// 创建自定义 Hook
export const useMyContext = (): MyContextType => {
  const context = useContext(MyContext)
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyProvider')
  }
  return context
}
