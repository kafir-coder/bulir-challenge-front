import { FC } from "react";

import { InputProps } from './input.types'

const Input: FC<InputProps> = ({ register = {}, ...rest }) => {
  return(
    <input 
      className="border-[2px] border-gray-400 border-solid rounded p-2 text-gray-500 w-full min-h-[40px]"
      {...rest}
      {...register}
    />
  )
}

export default Input