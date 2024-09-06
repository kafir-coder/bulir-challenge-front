import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import Button from "~/components/button";
import Input from "~/components/input";
import { scheduleServiceSchema } from "./utils";
import { FormErrorText } from "~/components/helpers/form-error-text";
import { scheduleAction } from "~/app/actions/schedule";

const ScheduleServiceForm: FC<{ id: string, onClose: () => void }> = ({ id, onClose }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(scheduleServiceSchema),
  })

  const onSubmit = async (formData: { date: string }) => {
    setLoading(true)

    const response = await scheduleAction<{ id: string, error?: string }>(id, formData.date)

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
          placeholder="Data"
          register={register("date")}
          type="date"
        />
        <FormErrorText
          text={errors.date?.message}
        />
        {error && (
          <FormErrorText
            text={error}
          />
        )}

        <div></div>

        <Button
          text="Agendar Serviço"
          type="submit"
          loading={loading}
        />
      </form>
    </div>
  )
}

export default ScheduleServiceForm