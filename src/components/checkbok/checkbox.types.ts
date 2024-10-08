import { InputHTMLAttributes } from 'react'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  checkBoxID: string
} 