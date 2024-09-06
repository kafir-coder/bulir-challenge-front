import { FC } from "react"
import Modal from "~/components/modal"
import ScheduleServiceForm from "./schedule-service-form"
import { AddServiceModalProps } from "./home.types"

const ScheduleServiceModal: FC<Omit<AddServiceModalProps, "data"> & {id: string}> = ({ show, onClose, title, id }) => {
  return(
    <Modal
      title={title || "Adicionar Serviço"}
      chidren={
        <ScheduleServiceForm 
          id={id}
          onClose={onClose}
        />
      }
      show={show}
      onClose={onClose}
    />
  )
}

export default ScheduleServiceModal