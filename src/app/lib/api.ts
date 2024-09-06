export const baseURL = process.env.BASE_URL

export const api = (endPoint: string, init?: RequestInit | undefined) => {
  return fetch(`${baseURL}${endPoint}`, init)
}
