import { ServiceProps } from "~/types/service"

export type ServiceCardPorps = {
  userRole: 'Client' | 'ServiceProvider'
} & ServiceProps

export type ModalToShow = "EDIT" | "DELETE" | "SCHEDULE" | ""