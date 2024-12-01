export const tokenInfo = new Map()
export async function saveToken(token: string) {
  console.log('saveToken', token)
  if (token) {
    tokenInfo.set('token', token)
  }
}
export async function getToken() {
  return tokenInfo.get('token') || ''
}
export async function clearToken() {
  tokenInfo.delete('token')
}
