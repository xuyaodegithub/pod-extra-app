'use client'
// src/context/MyContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

// 定义上下文的值的类型
interface MyContextType {
  userInfo: any | null
  setUserInfo: (data: any | null) => void
}

// 创建上下文，指定默认值
const MyContext = createContext<MyContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<any | null>(null)
  useEffect(() => {
    setUserInfo({ userName: 'XuYao', email: 'xuyao@podextra.ai' })
  }, [])

  return <MyContext.Provider value={{ userInfo, setUserInfo }}>{children}</MyContext.Provider>
}

// 创建自定义 Hook
export const useUserInfo = (): MyContextType => {
  const context = useContext(MyContext)
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyProvider')
  }
  return context
}
