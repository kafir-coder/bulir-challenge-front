"use client"

import { FC, useState } from "react";
import { HistoryCardPorps, HistoryStatus } from "./history-card.types";
import { RenderHistoryStatus } from "./status";
import { USER_ROLES } from "~/constants/user-roles";
import CancelServiceModal from "~/screens/history/cancel-service-modal";
import { formatDate } from "~/utils/intex";

const HistoryCard: FC<HistoryCardPorps> = ({ bookingDate, status, service, serviceProvider, userRole, client, id }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [showCancel, setShowCancel]= useState(false)

  const toggleShowCancel = (isOpen: boolean) => setShowCancel(isOpen)
 
  return(
    <>
      <div 
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
        className="w-full min-h-[100px] rounded-[8px] transition-all shadow-default p-4 flex justify-between cursor-pointer hover:scale-[1.01]"
        >
        <div
          className="flex flex-col"
          >
          <span
            className="font-bold text-[1.4rem] text-indigo-500"
            >
            {service?.name || ""}
          </span>

          <span
            className="text-gray-400"
            >
            {(userRole === USER_ROLES.CLIENT ? serviceProvider?.fullName  : client?.fullName) || ""}
          </span>
          <span
            className="text-gray-400"
            >
            {formatDate(bookingDate) || ""}
          </span>
          <span
            className="text-gray-400"
            >
            AKZ {" "} {service.fee || ""}
          </span>
        </div>

        <div
          className="flex flex-col justify-between items-end"
        >
          {status === HistoryStatus.PENDING && userRole === USER_ROLES.CLIENT ? (
            <div
              className={`flex gap-4 transition-all ${isFocused ? 'opacity-1' : 'opacity-0' }`}
            >
              <button
                onClick={() => toggleShowCancel(true)}
                className="cursor-pointer font-bold text-gray-500 hover:text-indigo-500"
              >
                Cancelar
              </button>
            </div>
          ) : <div/>}


          <span
            className="text-yellow-400 self-end text-sm"
            >
            <RenderHistoryStatus
              status={status}
            />
          </span>
        </div>
      </div>
      
      {showCancel && (
        <CancelServiceModal
          show={showCancel}
          onClose={() => toggleShowCancel(false)}
          id={id}
          name={service.name}
          serviceID={service.id}
        />
      )}
    </>
  )
}

export default HistoryCard