'use client'
// src/context/MyContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { getUerInfo } from '@/app/lib/service'

// 定义上下文的值的类型
interface MyContextType {
  userInfo: any | null
  setUserInfo: (userInfo: any | null) => void
  showDialog: boolean
  setShowDialog: (showDialog: boolean) => void
  showLoginDialog: boolean
  setShowLoginDialog: (showLoginDialog: boolean) => void
  loading: boolean
  setLoading: (showLoginDialog: boolean) => void
  initUserInfo: () => Promise<void>
}

// 创建上下文，指定默认值
const MyContext = createContext<MyContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<any | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  async function initUserInfo() {
    try {
      const { data } = await getUerInfo()
      setUserInfo(data)
    } catch (e) {}

    setLoading(false)
  }
  useEffect(() => {
    // setUserInfo({ userName: 'XuYao', email: 'xuyao@podextra.ai' })
  }, [])

  return (
    <MyContext.Provider
      value={{ userInfo, setUserInfo, showDialog, setShowDialog, showLoginDialog, setShowLoginDialog, loading, setLoading, initUserInfo }}
    >
      {children}
    </MyContext.Provider>
  )
}

// 创建自定义 Hook
export const useUserInfo = (): MyContextType => {
  const context = useContext(MyContext)
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyProvider')
  }
  return context
}
