import { FC, Suspense } from "react"
import { verifySession } from "~/app/lib/data-access-layer"
import HistoryCard from "~/components/history-card"
import LoadMore from "~/components/load-more"
import Loading from "~/components/loading"
import { getAllSchedules } from "~/services/schedules"
import { ScheduleProps } from "~/types/schedule"

type Responde = {
  serviceBookings: ScheduleProps[]
  total: number
}

let serviceBookings: ScheduleProps[] = []

const HistoryScreen: FC<{ page: string }> = async ({ page }) => {
  const data = await getAllSchedules<Responde>()
  const sesstion = await verifySession()

  if(page === "1") {
    serviceBookings = []
  }

  if(serviceBookings.length) {
    const currentServices = serviceBookings

    serviceBookings = [...currentServices, ...(data?.serviceBookings || [])]
  } else {
    serviceBookings = data?.serviceBookings || []
  }

  const disableLoadMore = Math.ceil(serviceBookings.length / 10 ) >= Math.ceil((data?.total || 0) / 10 ) || !serviceBookings.length

  return(
    <div className="flex min-h-screen flex-col items-center justify-start bg-white pt-[120px]">
      <div className="flex w-full flex-col max-w-[700px]">
        <span 
          className="text-2xl font-bold"
        >
          Histórico
        </span>

        <Suspense fallback={<Loading />}>
          <div
            className="w-full flex flex-col pt-1 mt-[40px] gap-4 pb-6"
          >
            {serviceBookings?.map((history, index) => (
              <HistoryCard
                key={`${history.id} - ${index}`}
                {...history}
                userRole={sesstion.user.role}
              />
            ))}

          </div>
          

          <div
            className="flex w-full justify-center p-4"
          >
            <LoadMore
              page={page}
              disable={disableLoadMore}
            />
          </div>
        </Suspense>
      </div>
    </div>
  )
}

export default HistoryScreen