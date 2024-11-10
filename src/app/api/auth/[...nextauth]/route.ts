// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    // signIn: '/api/auth/signin/google', // 自定义登录页面路径
    // callbackUrl: '/home',
  },
  // callbacks: {
  //   async redirect({ url, baseUrl }) {
  //     // 可以根据用户的角色或其他条件动态重定向
  //     console.log(url, baseUrl, '-----------')
  //     return baseUrl + '/home' // 例如登录成功后直接跳转到仪表盘
  //   },
  // },
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   return baseUrl // 登录成功后返回主窗口的 URL
    // },
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }: any) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    },
  },
  debug: true,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
