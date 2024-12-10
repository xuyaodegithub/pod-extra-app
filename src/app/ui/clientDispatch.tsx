'use client'
import { useMyContext } from '@/context/MyContext'
import { useEffect } from 'react'
import { BearerToken, loginTime, refreshToken as rToken, cookiesOption } from '@/app/lib/config'
import { useRouter } from 'next/navigation'
import cookies from 'js-cookie'

export function ClientSub({ val, param, cookie }: { val: any; param?: any; cookie?: any }) {
  const { setTitle } = useMyContext()
  const { replace } = useRouter()
  const { refresh, token, refreshToken } = cookie || {}
  if (!!refresh) {
    if (token) {
      cookies.set(BearerToken, token, cookiesOption())
      cookies.set(loginTime, `${Date.now()}`, cookiesOption())
      cookies.set(rToken, refreshToken, cookiesOption())
    } else {
      console.log('token is empty', '失效了')
      cookies.remove(BearerToken)
      cookies.remove(refreshToken)
      replace('/home')
    }
  }
  useEffect(() => {
    setTitle(val)
  }, [val])
  return null
}
