import * as yup from "yup"

export const loginSchema = yup
  .object({
    email: yup.string().required("Campo obrigatório"),
    password: yup.string().required("Campo obrigatório").min(8, "A senha precisa ter pelo menos 8 caracteres"),
  })


export enum LOGIN_ERROR_MESSAGES {
  "USER_NOT_FOUND" = "recurso não encontrado",
  "INVALID_PASSWORD" = "Password invalida"
}

export const translateMessage = (message: LOGIN_ERROR_MESSAGES) => {
  if(message === LOGIN_ERROR_MESSAGES.USER_NOT_FOUND) return "Usuário não encontrado"

  if(message === LOGIN_ERROR_MESSAGES.INVALID_PASSWORD) return "Senha inválida"

  return message
}
  