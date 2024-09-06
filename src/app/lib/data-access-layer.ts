import 'server-only'
 
import { cookies } from 'next/headers'
import { decrypt } from './section'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import { USER_ROLES } from '~/constants/user-roles'
import { get } from './fetcher'
import { User } from '~/types/user'

export const verifySession = cache(async () => {
  const cookie = cookies().get('session')?.value
  const session = decrypt(cookie)
 
  return { 
    isAuth: true, 
    accessToken: session?.accessToken,
    user: {
      name: session?.userName,
      role: session?.userRole as USER_ROLES
    }
  }
})

export const getUser = async () => {
  const { isAuth } = await verifySession()

  if(!isAuth) {
    return null
  }

  try {
    const data = await get('/users/profile', {
      next: {
        tags: ['profile-user']
      }
    })
    
    return data as User

  } catch (error) {
    console.log("Erro:", error)
    return null
  }

}