"use client"

import { FC, useEffect, useLayoutEffect, useState } from "react"
import HistoryCard from "~/components/history-card"
import LoadMore from "~/components/load-more"
import ServiceCard from "~/components/service-card"
import { getAllSchedules } from "~/services/schedules"
import { ScheduleProps } from "~/types/schedule"

type Responde = {
  serviceBookings: ScheduleProps[]
  total: number
}

const HistoryList: FC<{ page: string, userRole: any }> = ({ page, userRole }) => {
  const [serviceBookings, setServiceBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  
  useEffect(() => {
    (async () => {
      setLoading(true)
      const data = await getAllSchedules<Responde>()
      setLoading(false)

      setTotal(data?.total || 0)

      if(data?.serviceBookings) {
        if(serviceBookings.length) {
          setServiceBookings([...serviceBookings, ...data?.serviceBookings])
        } else {
          setServiceBookings(data?.serviceBookings)
        }
      } 
     
    })()
  }, [page])

  const disableLoadMore = Math.ceil(serviceBookings.length / 10 ) >= Math.ceil(total / 10 ) || !serviceBookings.length || loading

  return (
    <div
      className="w-full flex flex-col pt-1 mt-[40px] pb-6 gap-4"
    >
      {serviceBookings?.map((history, index) => (
        <HistoryCard
          key={`${history.id} - ${index}`}
          {...history}
          userRole={userRole}
        />
      ))}

      <div
        className="flex w-full justify-center p-4"
      >
        {loading && (
          <div className="w-full flex justify-center">
            <div 
              className="animate-spin h-[22px] w-[22px] mr-3 rounded-full bg-[transparent] border-solid border-[3px] border-indigo-200 border-r-indigo-500" 
            /> 
          </div>
        )}
        <LoadMore
          page={page}
          disable={disableLoadMore}
        />
      </div>
    </div>
  )
}

export default HistoryList