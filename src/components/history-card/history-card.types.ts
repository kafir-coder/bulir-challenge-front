// bookingDate, status, client, service, serviceProvider

import { ScheduleProps } from "~/types/schedule"

export enum HistoryStatus {
  PENDING = 'pending',
  CONFIRMED =  'confirmed',
  CANCELLED =  'cancelled' 
}

export type HistoryCardPorps = {
  userRole: 'Client' | 'ServiceProvider'
} & ScheduleProps