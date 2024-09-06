import { fetcher, get, patch, post } from "~/app/lib/fetcher"
import { ServiceProps } from "~/types/service"
import { ModalFormData } from "~/screens/home/home.types";
import { revalidateTag } from 'next/cache'
import { fixTinaResults } from "~/utils/intex";

type Response = {
  services: ServiceProps[],
  total: number
}

type CreateOrEditResponse = { error?: string } & ServiceProps

export const getAllServices = async (page: number = 1): Promise<Response | undefined> => {
  try {
    const data = await get<Response>(`/services?page=${page}&limit=10`, {
      next: {
        tags: ['services'],
      },
      cache: 'no-store'
    })

    return data
    
  } catch (error) {
    console.log("ERROR:", error)
  }
}

export const addService = async (data: Omit<ModalFormData, "id">) => {
  try {
    const response = await post('/services', {
      name: data.name,
      description: data.description,
      fee: Number(data.fee)
    })

    revalidateTag('services')

    return response as CreateOrEditResponse
  } catch (error) {
    console.log("Erro")
  }
} 

export const updateService = async (data: ModalFormData) => {
  try {
    const response = await patch(`/services/${data.id}`, {
      name: data.name,
      description: data.description,
      fee: Number(data.fee)
    })

    revalidateTag('services')

    return response as CreateOrEditResponse
  } catch (error) {
    console.log("Erro")
  }
} 

export const deleteService = async <T>(id: string) => {
  try {
    const response = await fetcher.delete(`/services/${id}`)

    revalidateTag('services')

    return fixTinaResults(response)
  } catch (error) {
    console.log("Erro", error)
  }
}