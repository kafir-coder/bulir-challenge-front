import { FC, useState } from "react"
import Modal from "~/components/modal"
import Button from "~/components/button"
import { CancelServiceModalProps } from "./history-types"
import { cancelScheduleAction } from "~/app/actions/schedule"

const CancelServiceModal: FC<CancelServiceModalProps> = ({ id, name, show, serviceID, onClose }) => {
  return(
    <Modal
      title="Cancelar agendamento"
      chidren={
        <Content 
          name={name} 
          id={id} 
          serviceID={serviceID}
          onClose={onClose}
        />
      }
      show={show}
      onClose={onClose}
    />
  )
}

const Content: FC<{ name: string, id: string, serviceID: string, onClose: () => void }> = ({ name, id, serviceID, onClose }) => {
  const [loading, setLoading] = useState(false)

  const handleCancelSchedule = async () => {
    setLoading(true)

    await cancelScheduleAction(id, serviceID)

    setLoading(false)
    onClose && onClose()
  }

  return(
    <div
      className="flex flex-col w-full max-w-[400px] mt-8 pb-6"
    >
      <form 
        action={() => handleCancelSchedule()}
        >
        <span>
          Tem certeza de que deseja cancelar o agendamento do serviço  {' '}
          <strong>{name}</strong>
        ?</span>

        <Button
          text="Sim, tenho"
          type="submit"
          className="bg-red-500 mt-5"
          loading={loading}
        />
      </form>
    </div>
  )
}

export default CancelServiceModal