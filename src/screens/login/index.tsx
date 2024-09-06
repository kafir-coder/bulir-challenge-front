import {FC} from 'react'
import LoginScreenForm from './form'
import Link from 'next/link'

const LoginScreen: FC = () => {
 
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <span 
        className="text-gray-700 font-bold text-2xl mb-4"
      >
        Login
      </span>

      <LoginScreenForm />

      <Link 
        href="sign-up" 
        className="text-gray-500 mt-[20px] hover:text-indigo-500"
      >
        Criar conta
      </Link>
      
    </div>
  )
}

export default LoginScreen