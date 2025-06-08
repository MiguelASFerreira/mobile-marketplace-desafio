import { api } from "@lib/api";

interface SellerProfile {
  name: string;
  phone: string;
  email: string;
  avatarId?: string;
  password?: string;
  newPassword?: string;
}

export async function edtiProfile(data: SellerProfile) {
  await api.put("/sellers", data)
}