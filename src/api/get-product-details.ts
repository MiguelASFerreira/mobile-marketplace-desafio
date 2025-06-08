import { api } from "@lib/api"
import { Product } from "./get-all-products"


interface GetProductDetailsResponse {
  product: Product
}

export async function getProductDetails(productId: string) {
  const response = await api.get<GetProductDetailsResponse>(
    `/products/${productId}`,
  )

  return response.data
}