import { FC } from "react"

const Loading: FC = () => {
  return (
    <div className="flex w-full justify-center">
      <div 
        className="animate-spin h-[22px] w-[22px] mr-3 rounded-full bg-[transparent] border-solid border-[3px] border-indigo-200 border-r-indigo-500"   
      /> 
    </div>
  )
}

export default Loading