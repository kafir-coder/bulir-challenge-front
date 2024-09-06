import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import Button from "~/components/button";
import Input from "~/components/input";
import { addServiceSchema } from "./utils";
import { FormErrorText } from "~/components/helpers/form-error-text";
import { ModalFormData } from "./home.types";
import { addServiceAction, updateServiceAction } from "~/app/actions/service";

const AddServiceForm: FC<{ data?: ModalFormData, onClose: () => void }> = ({ data, onClose }) => {
  const [loading, setLoading] =useState(false)
  const [error, setError] = useState("")

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addServiceSchema),
    defaultValues: data
  })

  const onSubmit = async (formData: any) => {
    setLoading(true)
    const response = data?.id ? await updateServiceAction(formData) : await addServiceAction(formData)

    setLoading(false)

    if(response?.error) {
      setError(response.error)
    }

    if(response?.id) {
      onClose && onClose()
    }
  }

  useEffect(() => {
    const subscription = watch(() => {
      setError("")
    })
    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <div className="flex w-full max-w-[400px] mt-8 pb-6">
      <form 
        className="flex w-full flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          placeholder="Nome"
          register={register("name")}
        />
        <FormErrorText
          text={errors.name?.message}
        />
        <Input
          placeholder="Descrição"
          register={register("description")}
        />
        <FormErrorText
          text={errors.description?.message}
        />
        <Input
          placeholder="Preço"
          register={register("fee")}
          type="number"
        />
        <FormErrorText
          text={errors.fee?.message}
        />
        {error && (
          <FormErrorText
            text={error}
          />
        )}

        <div></div>

        <Button
          text={data?.id ? "Editar Serviço" : "Adicionar Serviço"}
          type="submit"
          loading={loading}
        />
      </form>
    </div>
  )
}

export default AddServiceForm