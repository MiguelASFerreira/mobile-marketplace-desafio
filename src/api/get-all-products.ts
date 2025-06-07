import { api } from '@lib/api'

interface GetProductsQuery {
  query: string
}

export type ProductStatus = 'available' | 'sold' | 'cancelled'

export type Product = {
  id: string
  title: string
  description: string
  priceInCents: number
  status: ProductStatus
  owner: {
    id: string
    name: string
    phone: string
    email: string
    avatar: {
      id: string
      url: string
    } | null
  }
  category: {
    id: string
    title: string
    slug: string
  }
  attachments: Array<{
    id: string
    url: string
  }>
}

export interface GetProductsResponse {
  products: Product[]
}

export async function getAllProducts({ query }: GetProductsQuery) {
  const response = await api.get<GetProductsResponse>(`/products/${query}`)
  return response.data
}