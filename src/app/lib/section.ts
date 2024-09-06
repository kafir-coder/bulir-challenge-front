import 'server-only'
import { cookies } from 'next/headers'

export function encrypt(payload: Object) {
  return JSON.stringify(payload)
}

export function decrypt(session: string | undefined = '') {
  if(!session) {
    return null
  }
  const getObject = JSON.parse(session)

  return getObject as {
    accessToken: string,
    userName: string,
    userRole: string
  }
}
 
export async function createSession(accessToken: string, userName: string, userRole: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  const session = encrypt({
    accessToken,
    userName,
    userRole
  })
  
  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    path: '/',
  })
}

export function deleteSession() {
  cookies().delete('session')
}
