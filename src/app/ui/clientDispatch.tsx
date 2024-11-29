'use client'
import { useMyContext } from '@/context/MyContext'
import { useEffect } from 'react'

export function ClientSub({ val, param }: { val: any; param?: any }) {
  const { setTitle } = useMyContext()
  useEffect(() => {
    setTitle(val)
  }, [val])
  return null
}
