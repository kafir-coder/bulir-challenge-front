import { FC } from "react"
import { HistoryStatus } from "./history-card.types"

export const RenderHistoryStatus: FC<{ status: string }> = ({ status }) => {
  if(status === HistoryStatus.PENDING) {
    return (
      <span
        className="text-yellow-500"
      >
        Pendente
      </span>
    )
  }

  if(status === HistoryStatus.CANCELLED) {
    return (
      <span
        className="text-red-500"
      >
        Cancelado
      </span>
    )
  }

  return (
    <span
      className="text-green-600"
    >
      Confirmado
    </span>
  )
}