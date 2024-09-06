import { ServiceCardPorps } from "~/components/service-card/service-card.types"

export type ModalFormData = {
  name: string,
  description:  string,
  fee: string,
  id: string
}

export type AddServiceModalProps = {
  show: boolean
  onClose: () => void
  data?: ModalFormData
  title?: string
}