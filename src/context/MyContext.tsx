'use client'
// src/context/MyContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react'

// 定义上下文的值的类型
interface MyContextType {
  data: string | null
  setData: (data: string | null) => void
}

// 创建上下文，指定默认值
const MyContext = createContext<MyContextType | undefined>(undefined)

export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<string | null>(null)

  return <MyContext.Provider value={{ data, setData }}>{children}</MyContext.Provider>
}

// 创建自定义 Hook
export const useMyContext = (): MyContextType => {
  const context = useContext(MyContext)
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyProvider')
  }
  return context
}
