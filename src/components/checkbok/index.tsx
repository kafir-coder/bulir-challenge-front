import { FC } from "react";
import { CheckboxProps } from "./checkbox.types";

const Checkbox: FC<CheckboxProps> = ({ label, checkBoxID, ...rest }) => {
  return(
    <label htmlFor={checkBoxID}>
    <div className="flex group active:ring-2 ring-black rounded items-center">
      <input
        {...rest}
        id={checkBoxID}
        type="checkbox"
        className="rounded-full h-[20px] w-[20px] cursor-pointer aria-selected:bg-slate-500"
      />
      <p className="pl-2  cursor-pointer group-hover:underline decoration-solid">
        {label || ""}
      </p>
    </div>
  </label>
  )
}

export default Checkbox