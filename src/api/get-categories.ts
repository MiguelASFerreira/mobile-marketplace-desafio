import { api } from "@lib/api"

export interface Category {
  id: string
  title: string
  slug: string
}

interface Response {
  categories: Category[]
}

export async function getCategories() {
  const response = await api.get<Response>('/categories')

  return response.data.categories
}