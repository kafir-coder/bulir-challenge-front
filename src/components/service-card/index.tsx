"use client"

import { FC, useState } from "react";
import { ModalToShow, ServiceCardPorps } from "./service-card.types";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import AddServiceModal from "~/screens/home/add-service-modal";
import DeleteServiceModal from "~/screens/home/delete-service-modal";
import { USER_ROLES } from "~/constants/user-roles";
import ScheduleServiceModal from "~/screens/home/schedule-service-modal";

const ServiceCard: FC<ServiceCardPorps> = ({ name, description, fee, provider, userRole, id }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalToShow, setModalToShow] = useState<ModalToShow>("")

  const toggleShowModal = (isOpen: boolean, isModalFor: ModalToShow) => {
    setShowModal(isOpen)
    setModalToShow(isModalFor)
  }
  
  return(
    <>
      <div 
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
        className="w-full min-h-[100px] rounded-[8px] transition-all shadow-default p-4 flex justify-between hover:scale-[1.01]"
        >
        <div
          className="flex flex-col"
          >
          <span
            className="font-bold text-[1.4rem] text-indigo-500"
            >
            {name || ""}
          </span>

          <span
            className="text-gray-400"
            >
            {description || ""}
          </span>
        </div>

        <div
          className="flex flex-col justify-between items-end"
          >
          {userRole === USER_ROLES.CLIENT ? (
            <button
              onClick={() => {
                toggleShowModal(true, "SCHEDULE")
              }}
              className="cursor-pointer font-bold text-gray-500 hover:text-indigo-500"
            >
              Agendar
            </button>
          ): (
            <div
              className={`flex gap-4 transition-all ${isFocused ? 'opacity-1' : 'opacity-0' }`}
              >
              <RiEdit2Fill 
                className="hover:text-blue-500 cursor-pointer"
                onClick={() => {
                  toggleShowModal(true, "EDIT")
                }}
              />
              <MdDelete 
                className="hover:text-red-500 cursor-pointer"
                onClick={() => {
                  toggleShowModal(true, "DELETE")
                }}
              />
            </div>
          )}


          <span
            className="text-yellow-400 self-end text-sm"
            >
            AKZ {fee || '00'}
          </span>
        </div>
      </div>
      
      <AddServiceModal 
        show={showModal && modalToShow === "EDIT"}
        onClose={() =>toggleShowModal(false, "")}
        data={{
          name,
          description,
          fee,
          id
        }}
        title="Editar Serviço"
      />

      <DeleteServiceModal
        show={showModal && modalToShow === "DELETE"}
        onClose={() => toggleShowModal(false, "")}
        data={{
          name,
          description,
          fee,
          id
        }}
      />

      <ScheduleServiceModal 
        show={showModal && modalToShow === "SCHEDULE"}
        onClose={() => toggleShowModal(false, "")}
        id={id}
        title="Agendar Serviço"
      />
    </>
  )
}

export default ServiceCard