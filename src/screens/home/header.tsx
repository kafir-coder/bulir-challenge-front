"use client"

import { FC, useState } from "react"
import { IoIosAddCircle } from "react-icons/io"
import AddServiceForm from "./add-service-form"
import Modal from "~/components/modal"
import AddServiceModal from "./add-service-modal"
import { USER_ROLES } from "~/constants/user-roles"

const Header: FC<{ userRole: "Client" | "ServiceProvider", userBalance?: number }> = ({ userRole, userBalance }) => {
  const [showModal, setShowModal] = useState(false)

  const toggleModal = (isOpen: boolean) => setShowModal(isOpen)

  return (
    <>
      <div className="w-full flex justify-between">
        <span 
          className="text-2xl font-bold"
          >
          Serviços
        </span>

        {userRole === USER_ROLES.SERVICE_PROVIDER && (
          <IoIosAddCircle 
            size={30}
            className="cursor-pointer transition-all hover:scale-[1.1] hover:text-indigo-500"
            onClick={() => toggleModal(true)}
          />
        )} 

        {userRole === USER_ROLES.CLIENT && (
          <span>
           AKZ {userBalance || "0"}
          </span>
        )}
      </div>
    
      
      <AddServiceModal
        show={showModal}
        onClose={() => toggleModal(false)}
      />
    </>
  )
}

export default Header