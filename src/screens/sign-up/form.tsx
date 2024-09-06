"use client"

import { FC, useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import Button from '~/components/button'
import Input from '~/components/input'
import Select from '~/components/input/select'
import { createUserSchema } from './utils'
import { FormErrorText } from '~/components/helpers/form-error-text'
import { signUp } from '~/app/actions/auth'
import { USER_ROLES } from '~/constants/user-roles'

const ROLES = [
  {
    label: "Cliente",
    value: "Client"
  },
  {
    label: "Provedor de serviço",
    value: "ServiceProvider"
  },
]

const SignUpScreenForm: FC = () => {
  const [loading, setLoading] =useState(false)
  const [error, setError] = useState("")

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createUserSchema)
  })

  async function handleSighUp(form: any) {
    setLoading(true)

    const response = await signUp(form)

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

  const { role } = watch()
 
  return (
    <form 
      onSubmit={handleSubmit(handleSighUp)}
      method='POST'
      className="w-[300px] flex flex-col gap-2"
    >
      <Input
        placeholder="Nome completo"
        register={register("fullname")}
      />
      <FormErrorText
        text={errors.fullname?.message}
      />
      <Select
        data={ROLES}
        register={register("role")}
      />
      <FormErrorText
        text={errors.role?.message}
      />

      {role === USER_ROLES.SERVICE_PROVIDER &&
        (
          <>
            <Input
              placeholder="NIF"
              register={register("nif")}
            />
            <FormErrorText
              text={errors.nif?.message}
            />
          </>
        )
      }
      
      <Input
        placeholder="Email"
        register={register("email")}
      />
      <FormErrorText
        text={errors.email?.message}
      />

      <Input
        placeholder="Balance"
        register={register("balance")}
        type='number'
      />
      <FormErrorText
        text={errors.balance?.message}
      />

      <Input
        placeholder="Senha"
        type="password"
        register={register("password")}
      />
      <FormErrorText
        text={errors.password?.message}
      />
      {error && (
        <FormErrorText
          text={error}
        />
      )}

      <div />

      <Button
        text='Criar Conta'
        type="submit"
        loading={loading}
      />
    </form> 
  )
}

export default SignUpScreenForm