import { FC, Suspense } from "react";
import ServiceCard from "~/components/service-card";
import Header from "./header";
import { getUser, verifySession } from "~/app/lib/data-access-layer";
import { getAllServices } from "~/services/services";
import LoadMore from "~/components/load-more";
import { ServiceProps } from "~/types/service";
import Loading from "~/components/loading";

let services: ServiceProps[] = []

const HomeScreen: FC<{ page: string }> = async ({ page }) => {
  const sesstion = await verifySession()

  const data = await getAllServices(Number(page))

  const user = await getUser()

  if(page === "1") {
    services = []
  }

  if(services.length) {
    const currentServices = services

    services = [...currentServices, ...(data?.services || [])]
  } else {
    services = data?.services || []
  }

  const disableLoadMore = Math.ceil(services.length / 10 ) >= Math.ceil((data?.total || 0) / 10 ) || !services.length

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-white pt-[120px]">
      <div className="flex w-full flex-col max-w-[700px]">
        <Header
          userRole={sesstion.user.role}
          userBalance={user?.balance}
        />

        <Suspense fallback={<Loading />}>
          <div
            className="w-full flex flex-col pt-1 mt-[40px] pb-6 gap-4"
          >
            {services?.length === 0 && (
              <div className="flex w-full justify-center">
                <span>Sem Serviço</span>
              </div>
            )}
            {services?.map((service, index) => (
              <ServiceCard
                key={`${service.name} - ${index}`}
                {...service}
                userRole={sesstion.user.role}
              />
            ))}

          </div>
        </Suspense>

        <div
          className="flex w-full justify-center p-4"
        >
          <LoadMore
            page={page}
            disable={disableLoadMore}
          />
        </div>
        
      </div>
    </div>
  )
}

export default HomeScreen