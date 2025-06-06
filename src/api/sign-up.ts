import { api } from "@lib/api"

export interface SignUpBody {
  name: string
  phone: string
  email: string
  avatarId: string
  password: string
  passwordConfirmation: string
}

export async function signUp(data: SignUpBody) {
  return await api.post('/sellers', data)
}
