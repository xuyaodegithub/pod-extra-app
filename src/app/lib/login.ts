export const client_id = '177611048095-egpeo6uvi016s4qeeep1tafckf9n0ph0.apps.googleusercontent.com'
export const redirect_uri = process.env.NEXT_PUBLIC_NEXTAUTH_URL
import { googleIdToken, googleAccessToken, callbackPath } from '@/app/lib/config'
import cookies from 'js-cookie'
import { usePathname } from 'next/navigation'
/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
export const oauthSignIn = () => {
  // Google's OAuth 2.0 endpoint for requesting an access token
  const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth'

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  const form = document.createElement('form')
  form.setAttribute('method', 'GET') // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint)

  // Parameters to pass to OAuth 2.0 endpoint.
  const params: any = {
    client_id,
    redirect_uri, //'http://localhost:3000/home',
    response_type: 'token',
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    include_granted_scopes: 'true',
    // access_type: 'offline',
    // prompt: 'consent',
    state: 'pass-through value',
  }

  // Add form parameters as hidden input values.
  for (const p in params) {
    const input = document.createElement('input')
    input.setAttribute('type', 'hidden')
    input.setAttribute('name', p)
    input.setAttribute('value', params[p])
    form.appendChild(input)
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form)
  form.submit()
}

export const googleLoginPopup = () => {
  const redirectPath = encodeURIComponent(window.location.href)
  console.log(window.location.pathname + window.location.search, 'redirectPath')
  const state = `${redirectPath}`
  const redirectUri = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/auth/callback`
  // 设置 OAuth 2.0 授权 URL
  const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth'
  const authUrl = `${oauth2Endpoint}?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=id_token token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid&include_granted_scopes=true&state=${encodeURIComponent(state)}&nonce=${Date.now()}&response_mode=form_post`
  console.log(authUrl, 'authUrl')
  // 打开小窗口
  const width = 500
  const height = 600
  const left = (window.screen.width - width) / 2
  const top = (window.screen.height - height) / 2
  // const newWindow = window.open(authUrl, 'googleLogin', `width=${width},height=${height},top=${top},left=${left}`)
  cookies.set(callbackPath, decodeURIComponent(redirectPath))
  window.location.href = authUrl

  // 轮询检测窗口是否关闭
  // const pollTimer = window.setInterval(() => {
  //   if (newWindow && newWindow.closed) {
  //     window.clearInterval(pollTimer)
  //     // 在窗口关闭后处理用户登录状态
  //     console.log('Google login window closed')
  //     // 此处可以执行进一步操作，例如刷新页面、获取用户信息等
  //   }
  // }, 500)
}

// export const revokeAccess = () => {
//   const accessToken: any = localStorage.getItem(googleIdToken)
//   if (!accessToken) return
//   // Google's OAuth 2.0 endpoint for revoking access tokens.
//   const revokeTokenEndpoint = 'https://oauth2.googleapis.com/revoke'
//
//   // Create <form> element to use to POST data to the OAuth 2.0 endpoint.
//   const form = document.createElement('form')
//   form.setAttribute('method', 'post')
//   form.setAttribute('action', revokeTokenEndpoint)
//
//   // Add access token to the form so it is set as value of 'token' parameter.
//   // This corresponds to the sample curl request, where the URL is:
//   //      https://oauth2.googleapis.com/revoke?token={token}
//   const tokenField = document.createElement('input')
//   tokenField.setAttribute('type', 'hidden')
//   tokenField.setAttribute('name', 'token')
//   tokenField.setAttribute('value', accessToken)
//   form.appendChild(tokenField)
//
//   // Add form to page and submit it to actually revoke the token.
//   document.body.appendChild(form)
//   form.submit()
//   localStorage.removeItem(googleIdToken)
//   // window.location.href = window.location.href
// }
export const revokeAccess2 = async (redirectUrl = location.href) => {
  const accessToken = cookies.get(googleAccessToken) || ''
  if (!accessToken) return

  try {
    // Google's OAuth 2.0 endpoint for revoking access tokens.
    const revokeTokenEndpoint = 'https://oauth2.googleapis.com/revoke'

    // Use fetch to POST the token to the revoke endpoint
    const response = await fetch(revokeTokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ token: accessToken }),
    })

    if (response.ok) {
      // Remove access token from local storage
      cookies.remove(googleAccessToken)

      // Redirect to the specified page (default to home page)
      window.location.href = redirectUrl
    } else {
      // console.error('Failed to revoke token', await response.text())
    }
  } catch (error) {
    cookies.remove(googleAccessToken)
    // Redirect to the specified page (default to home page)
    window.location.href = redirectUrl
    // console.error('Error revoking token:', error)
  }
}
