import { api } from "@lib/api";

interface GetCountViewsProductResponse {
  amount: number
}

export async function getCountViewsProduct(productId: string) {
  const response = await api.get<GetCountViewsProductResponse>(`products/${productId}/metrics/views`)

  return response.data
}