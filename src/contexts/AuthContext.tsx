import { createContext, ReactNode, useEffect, useState } from "react";

import {
  storageAuthTokenSave,
  storageAuthTokenGet,
  storageAuthTokenRemove,
} from "@storage/storageAuthToken";
import {
  storageSellerGet,
  storageSellerRemove,
  storageSellerSave,
} from "@storage/storageSeller";

import { SellerDTO } from "@dtos/SellerDTO";
import { api } from "@lib/api";
import { signIn } from "@api/sign-in";
import { getSellerProfile } from "@api/get-seller-profile";
import { signOut } from "@api/sign-out";

export type AuthContextDataProps = {
  seller: SellerDTO;
  singInSeller: (email: string, password: string) => Promise<void>;
  updateSellerProfile: (sellerUpdated: SellerDTO) => Promise<void>;
  signOutSeller: () => Promise<void>;
  isLoadingSellerStorageData: boolean;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [seller, setSeller] = useState<SellerDTO>({} as SellerDTO);
  const [isLoadingSellerStorageData, setIsLoadingSellerStorageData] =
    useState(true);

  async function sellerAndTokenUpdate(
    sellerData: SellerDTO,
    accessToken: string
  ) {
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    setSeller(sellerData);
  }

  async function storageSellerAndTokenSave(
    sellerData: SellerDTO,
    accessToken: string
  ) {
    try {
      setIsLoadingSellerStorageData(true);
      await storageSellerSave(sellerData);
      await storageAuthTokenSave({ accessToken });
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingSellerStorageData(false);
    }
  }

  async function singInSeller(email: string, password: string) {
    try {
      const { data } = await signIn({ email, password });
      const { seller } = await getSellerProfile();

      if (seller && data.accessToken) {
        await storageSellerAndTokenSave(seller, data.accessToken);
        sellerAndTokenUpdate(seller, data.accessToken);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingSellerStorageData(false);
    }
  }

  async function signOutSeller() {
    try {
      setIsLoadingSellerStorageData(true);
      setSeller({} as SellerDTO);
      await storageSellerRemove();
      await storageAuthTokenRemove();
      await signOut();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingSellerStorageData(false);
    }
  }

  async function updateSellerProfile(sellerUpdated: SellerDTO) {
    try {
      setSeller(sellerUpdated);
      await storageSellerSave(sellerUpdated);
    } catch (error) {
      throw error;
    }
  }

  async function loadSellerData() {
    try {
      setIsLoadingSellerStorageData(true);

      const sellerLogged = await storageSellerGet();
      const { accessToken } = await storageAuthTokenGet();

      if (accessToken && sellerLogged) {
        sellerAndTokenUpdate(sellerLogged, accessToken);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingSellerStorageData(false);
    }
  }

  useEffect(() => {
    loadSellerData();
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOutSeller);

    return () => {
      subscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        seller,
        singInSeller,
        updateSellerProfile,
        signOutSeller,
        isLoadingSellerStorageData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
