"use server"

import { redirect } from "next/navigation"
import { post } from "../lib/fetcher"
import { createSession, deleteSession } from "../lib/section"
import { User } from "~/types/user"

type Respose = {
  accessToken: string,
  name: string,
  role: string,
  expiresIn: string
  error?: string
}

type CreateUserResponse = User & { error?: string }

export async function signIn (email: string, password: string) {
  const response = await post<Respose>("/auth/login", {
    email,
    password
  })

  if(response.accessToken) {
    createSession(
      response.accessToken,
      response.name,
      response.role
    )

    redirect("/home")
  }

  return response
}

export async function signUp (data: any) {
  const response = await post<CreateUserResponse>("/users", data)

  if(response.id) {
    redirect("/login")
  }

  return response
}

export async function logout() {
  deleteSession()
  redirect('/login')
}