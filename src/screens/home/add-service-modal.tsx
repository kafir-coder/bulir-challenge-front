import { FC } from "react"
import Modal from "~/components/modal"
import AddServiceForm from "./add-service-form"
import { AddServiceModalProps } from "./home.types"

const AddServiceModal: FC<AddServiceModalProps> = ({ show, onClose, data, title }) => {
  return(
    <Modal
      title={title || "Adicionar Serviço"}
      chidren={
        <AddServiceForm 
          data={data} 
          onClose={onClose}
        />
      }
      show={show}
      onClose={onClose}
    />
  )
}

export default AddServiceModal