'use client'
import { useUserInfo } from '@/context/UserInfo'
import { useState, useEffect } from 'react'
import { oauthSignIn, googleLoginPopup, revokeAccess2, client_id, redirect_uri } from '@/app/lib/login'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { googleAccessToken } from '@/app/lib/config'
export default function loginDialog() {
  const { userInfo, setUserInfo, showDialog, setShowDialog, showLoginDialog, setShowLoginDialog } = useUserInfo()
  const [open, setOpen] = useState(false)
  const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth'
  const loginUrl: any = `${oauth2Endpoint}?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_NEXTAUTH_URL}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&include_granted_scopes=true&state=pass-through value`
  useEffect(() => {}, [])

  return (
    <Dialog open={showLoginDialog} onOpenChange={(val) => setShowLoginDialog(val)}>
      <DialogContent className={`w-[500px] bg-hbg dark:bg-bgDark rounded-[20px]`}>
        <DialogHeader>
          <DialogDescription className={`mt-[63px]`}>
            <iframe src={loginUrl} className={`w-[500px] h-[600px]`}></iframe>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
