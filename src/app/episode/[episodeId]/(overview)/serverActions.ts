// src/app/target-page/serverActions.ts
'use server'

export async function fetchToken(data: { token: string }) {
  // 这里可以根据业务需求进一步处理
  console.log('Server Action received token:', data.token)
  return data.token
}
