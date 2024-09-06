import { ReactNode } from "react"

export type ModalProps = {
  chidren: ReactNode
  title: string
  show?: boolean
  onClose?: () => void
}