import * as yup from "yup"
import { USER_ROLES } from "~/constants/user-roles";

export const createUserSchema = yup
  .object({
    fullname: yup.string().required("Campo obrigatório"),
    role: yup.string().required("Campo obrigatório"),
    nif: yup.string().when("role", {
      is: (val: USER_ROLES) => {
        return val === USER_ROLES.SERVICE_PROVIDER;
      },
      then: (s) => s.required("Campo obrigatório"),
      otherwise: (s) => s,
    }),
    email: yup.string().required("Campo obrigatório"),
    balance: yup.number().required("Campo obrigatório"),
    password: yup.string().required("Campo obrigatório").min(8, "A senha precisa ter pelo menos 8 caracteres"),
  })