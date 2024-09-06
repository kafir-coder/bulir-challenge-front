import { api } from "./api"
import { verifySession } from "./data-access-layer"

export const get = async <T>(endPoint: string, init?: RequestInit | undefined) => {
  const sesstion = await verifySession()

  const response = await api(endPoint, {
    ...init,
    method: 'GET', 
    headers: {
      'Authorization': `Bearer ${sesstion.accessToken}`,
      ...init?.headers
    },
  })
  
  return response.json() as T
}

export const post = async <T>(endPoint: string, body: Object, init?: RequestInit | undefined): Promise<T> => {
  const sesstion = await verifySession()
  
  try {
    const response = await api(endPoint, {
      ...init,
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sesstion.accessToken || ''}`,
        ...init?.headers
      },
      body: JSON.stringify(body),
      cache: 'no-cache'
    })

    return response.json() as T
    
  } catch (error) {
    console.log("TEMOS ERRO:", error)
    return error as any
  }
  
}

export const patch = async <T>(endPoint: string, body: Object, init?: RequestInit | undefined): Promise<T> => {
  const sesstion = await verifySession()
  
  try {
    const response = await api(endPoint, {
      ...init,
      method: 'PATCH', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sesstion.accessToken || ''}`,
        ...init?.headers
      },
      body: JSON.stringify(body),
      cache: 'no-cache'
    })
  
    return response.json() as T
    
  } catch (error) {
    console.log("TEMOS ERRO:", error)
    return error as any
  }
  
}

export const deleter = async <T>(endPoint: string, init?: RequestInit | undefined): Promise<T> => {
  const sesstion = await verifySession()
  
  try {
    const response = await api(endPoint, {
      ...init,
      method: 'DELETE', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sesstion.accessToken || ''}`,
        ...init?.headers
      },
      cache: 'no-cache'
    })
  
    return response as T
    
  } catch (error) {
    console.log("TEMOS ERRO:", error)
    return error as any
  }
  
}

export const fetcher = {
  get,
  post,
  patch,
  delete: deleter
}

