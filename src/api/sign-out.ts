import { api } from '@lib/api'

export async function signOut() {
  return await api.post('/sign-out')
}