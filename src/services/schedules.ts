import { revalidateTag } from "next/cache"
import { fetcher, get, post } from "~/app/lib/fetcher"
import { fixTinaResults } from "~/utils/intex"

export const getAllSchedules = async <T>(): Promise<T | undefined> => {
  try {
    const data = await get<Response>('/services/booking-history', {
      next: {
        tags: ['schedules']
      }
    })

    return data as T
    
  } catch (error) {
    console.log("ERROR:", error)
  }
}

export const schedule = async <T>(id: string, date: string) => {
  try {
    const response = await post(`/services/${id}/bookings`, {
      bookingDate: date 
    })

    revalidateTag('schedules')
    revalidateTag('profile-user')

    return response as T
  } catch (error) {
    console.log("ERROR:", error)
  }
}

export const cancelSchedule = async <T>(id: string, serviceID: string) => {
  try {
    const response = await fetcher.delete(`/services/${serviceID}/bookings/${id}`)

    revalidateTag('schedules')
    revalidateTag('profile-user')

    return fixTinaResults(response) as T
  } catch (error) {
    console.log("ERROR:", error)
  }
}