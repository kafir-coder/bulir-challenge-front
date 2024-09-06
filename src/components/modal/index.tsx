import { FC } from "react"
import { IoCloseSharp } from "react-icons/io5"
import { ModalProps } from "./modal.types"

const Modal: FC<ModalProps> = ({ title, show, chidren, onClose }) => {
  
  if(!show) {
    return <></>
  }

  return(
    <div
      className="fixed z-50  inset-0 bg-[#00000020] flex items-center justify-center"
    >
      <div className="w-[90%] bg-white px-6 py-7 max-w-[500px] rounded-[8px] shadow-default flex flex-col items-center">
        <div className="w-full flex justify-end">
          <IoCloseSharp 
            className="font-bold cursor-pointer"
            onClick={() => onClose && onClose()}
          />
        </div>
        
        <span
          className="font-bold text-[1.4rem] text-gray-500"
        >
          {title || ''}
        </span>

        {chidren}
      </div>

    </div>
  )
}

export default Modal