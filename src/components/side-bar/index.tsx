"use client"

import Link from "next/link";
import { FC } from "react";

import { usePathname } from "next/navigation"
import { logout } from "~/app/actions/auth";

const isSelected = (routeName: string, path: string) => routeName && path && path.includes(routeName)

const SideBar: FC = () => {
  const pathanme = usePathname()

  return(
    <div className="flex items-center justify-center h-[80px] w-screen bg-white absolute">
      <div className="w-full max-w-[700px] flex justify-between">
        <nav>
          <ul className="flex gap-4">
            <Link 
              className={` cursor-pointer hover:text-indigo-500 font-bold ${!isSelected('history', pathanme) ? 'text-indigo-500' : 'text-gray-600'}`}
              href="/home"
            >
              Serviços
            </Link>

            <Link 
              href="/home/history"
              className={` cursor-pointer hover:text-indigo-500 font-bold ${isSelected('history', pathanme) ? 'text-indigo-500' : 'text-gray-600'}`}
            >
              Hostórico
            </Link>
          </ul>
        </nav>

        <button
          onClick={() => logout()}
        >
          Sair
        </button>
      </div>
    </div>
  )
}


export default SideBar