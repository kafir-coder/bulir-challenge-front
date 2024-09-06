"use client"

import { FC, useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { signIn } from '~/app/actions/auth'
import Button from '~/components/button'
import { FormErrorText } from '~/components/helpers/form-error-text'
import Input from '~/components/input'
import { LOGIN_ERROR_MESSAGES, loginSchema, translateMessage } from './utils'

const LoginScreenForm: FC = () => {
  const [error, setError] = useState("")

  const [loading, setLoading] =useState(false)

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema)
  })

  async function handleLogin(formData: {  email: string, password: string}) {
    const { email, password } = formData
    setLoading(true)

    const response = await signIn(email, password)

    if(response?.error) {
      setError(response?.error)
    }

    setLoading(false)
  }

  useEffect(() => {
    const subscription = watch(() => {
      setError("")
    })
    return () => subscription.unsubscribe()
  }, [watch])
 
  return (
    <form 
      onSubmit={handleSubmit(handleLogin)}
      className="w-[300px] flex flex-col gap-2"
    >
      <Input
        placeholder="Email"
        register={register("email")}
      />
      <FormErrorText
        text={errors.email?.message}
      />

      <Input
        placeholder="Senha"
        type="password"
        register={register("password")}
      />
      <FormErrorText
        text={errors.password?.message}
      />

      {error && 
        <FormErrorText
          text={translateMessage(error as LOGIN_ERROR_MESSAGES)}
        />
      }

      <div />

      <Button
        text='Logar'
        type="submit"
        loading={loading}
      />
    </form> 
  )
}

export default LoginScreenForm