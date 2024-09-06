import { FC } from "react";
import { SelectProps } from "./input.types";

const Select: FC<SelectProps> = ({ data, register = {}, ...rest }) => {
  return (
    <select 
      id="testSelect" 
      {...rest} className="flex w-full border-[2px] border-gray-400 border-solid rounded p-2 text-gray-500 min-h-[40px]"
      {...register}
    >    
      {data.map(item => (
        <option 
          value={item.value} 
          className="block w-full"
          key={item.value}
        >
          {item.label}
        </option>
      ))}
    </select>
  )
}

export default Select