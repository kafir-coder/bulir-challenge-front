import { FC, useState } from "react"
import Modal from "~/components/modal"
import { AddServiceModalProps, ModalFormData } from "./home.types"
import Button from "~/components/button"
import { deleteServiceAction } from "~/app/actions/service"

const DeleteServiceModal: FC<Omit<AddServiceModalProps, "title">> = ({ show, onClose, data }) => {
  return(
    <Modal
      title={"Deletar Serviço"}
      chidren={
        <Content 
          data={data}
          onClose={onClose} 
        />
      }
      show={show}
      onClose={onClose}
    />
  )
}

const Content: FC<{ data?: ModalFormData, onClose: () => void }> = ({ data, onClose }) => {
  const [loading, setLoading] = useState(false)

  const handleSeleteService = async () => {
    setLoading(true)

    await deleteServiceAction(data?.id || "")

    setLoading(false)
    onClose && onClose()
  }

  return(
    <div className="flex flex-col w-full max-w-[400px] mt-8 pb-6">
      <form action={() => handleSeleteService()}>
      <span>
        Tem certeza de que deseja deletar o serviço  {' '}
        <strong>{data?.name}</strong>
      ?</span>

      <Button
        text="Sim, tenho"
        type="submit"
        loading={loading}
        className="bg-red-500 mt-5"
      />
      </form>
    </div>
  )
}

export default DeleteServiceModal