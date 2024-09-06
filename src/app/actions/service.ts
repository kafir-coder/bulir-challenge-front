"use server"

import { addService, updateService, deleteService, getAllServices } from "~/services/services"

export const addServiceAction = async (data: any) => await addService(data)

export const updateServiceAction = async (data: any) => await updateService(data)

export const deleteServiceAction = async <T>(id: string) => await deleteService<T>(id)

export const getAllServicesAction = async (page: number) => await getAllServices(page)