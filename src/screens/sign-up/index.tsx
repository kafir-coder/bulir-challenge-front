import {FC} from 'react'
import SignUpScreenForm from './form'
import Link from 'next/link'

const SignUpScreen: FC = () => {
 
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <span 
        className="text-gray-700 font-bold text-2xl mb-4"
      >
        Criar conta
      </span>

      <SignUpScreenForm />

      <span className="mt-[20px] text-gray-500">
        Ja possui uma conta? 

        <Link 
          href="login" 
          className="text-gray-400 ml-1 hover:text-indigo-500"
        >
          Logar
        </Link>
      </span>

      
      
    </div>
  )
}

export default SignUpScreen