import { InputHTMLAttributes, SelectHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: any
} 

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  data: { label: string, value: string | number } []
  register?: any
} 