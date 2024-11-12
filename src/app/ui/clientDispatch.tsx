'use client'
import { useMyContext } from '@/context/MyContext'
import { useEffect } from 'react'

export function ClientSub({ val }: { val: any }) {
  const { setTitle } = useMyContext()
  useEffect(() => {
    setTitle(val)
  }, [val])
  return null
}
