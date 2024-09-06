"use client"

import { FC, useLayoutEffect, useState } from "react"
import { getAllServicesAction } from "~/app/actions/service"
import LoadMore from "~/components/load-more"
import ServiceCard from "~/components/service-card"

const ServiceList: FC<{ page: string, userRole: any }> = ({ page, userRole }) => {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  
  useLayoutEffect(() => {
    (async () => {
      setLoading(true)
      const data = await getAllServicesAction(Number(page))
      setLoading(false)

      setTotal(data?.total || 0)

      if(data?.services) {
        if(services.length) {
          setServices([...services, ...data?.services])
        } else {
          setServices(data?.services)
        }
      } 
     
    })()
  }, [page])

  const disableLoadMore = Math.ceil(services.length / 10 ) >= Math.ceil(total / 10 ) || !services.length || loading

  return (
    <div
      className="w-full flex flex-col pt-1 mt-[40px] pb-6 gap-4"
    >
      {services?.map((service, index) => (
        <ServiceCard
          key={`${service.name} - ${index}`}
          {...service}
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

export default ServiceList