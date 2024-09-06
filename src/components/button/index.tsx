"use client"

import { FC } from "react";
import { ButtonProps } from "./button.types"

const Button: FC<ButtonProps> = ({ text, loading, className, ...rest }) => {
  return (
    <button
      {...rest}
      className={`${className} w-full bg-indigo-500 rounded p-2 flex justify-center items-center min-h-[40px]`}
      disabled={loading}
    >
      {loading ? (
        <div 
          className="animate-spin h-[22px] w-[22px] mr-3 rounded-full bg-[transparent] border-solid border-[3px] border-[#ffffff50] border-r-white" 
          
        /> 
      ) : (
        <span className="text-white">{text || ""}</span>
      )}
    </button>
  )
}

export default Button