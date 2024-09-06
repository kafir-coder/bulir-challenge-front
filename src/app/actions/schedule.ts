"use server"

import { schedule, cancelSchedule } from "~/services/schedules"

export const scheduleAction = async <T>(id: string, date: string) => await schedule<T>(id, date)

export const cancelScheduleAction = async <T>(id: string, serviceID: string) => await cancelSchedule<T>(id, serviceID)

