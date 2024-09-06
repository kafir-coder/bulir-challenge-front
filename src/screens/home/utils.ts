import * as yup from "yup"

export const addServiceSchema = yup
  .object({
    name: yup.string().required("Campo obrigatório"),
    description: yup.string().required("Campo obrigatório"),
    fee: yup.string().required("Campo obrigatório"),
  })

export const scheduleServiceSchema = yup
  .object({
    date: yup.string().required("Campo obrigatório"),
  })