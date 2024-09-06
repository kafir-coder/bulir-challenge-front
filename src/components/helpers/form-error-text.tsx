import { FC } from "react"

export const FormErrorText: FC<{ text?: string }> = ({ text }) => (
  <span
    className="text-sm text-red-500 p-0"
  >
    {text || ""}
  </span>
)
  