import React, { useMemo } from "react";
import { TouchableOpacity } from "react-native";
import {
  Container,
  ProductImage,
  ProductName,
  PriceLabel,
  PriceValue,
  ProductInfo,
} from "./styles";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

type ProductCartType = {
  id: string;
  title: string;
  priceInCents: number;
  attachments: Array<{
    id: string;
    url: string;
  }>;
};

type ProductCardProps = {
  product: ProductCartType;
  onPress?: () => void;
};

export function ProductCard({ product, onPress }: ProductCardProps) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const productUrl = useMemo(() => {
    const image = product?.attachments[0]?.url?.split("/attachments/")[1];
    return `${process.env.EXPO_PUBLIC_API_URL}/attachments/${image}`;
  }, [product]);
  const priceInReais = product.priceInCents / 100;

  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <Container>
        <ProductImage
          source={{
            uri: productUrl,
          }}
          resizeMode="cover"
        />
        <ProductInfo>
          <ProductName>{product.title}</ProductName>
          <PriceLabel>
            R${" "}
            <PriceValue>{priceInReais.toFixed(2).replace(".", ",")}</PriceValue>
          </PriceLabel>
        </ProductInfo>
      </Container>
    </TouchableOpacity>
  );
}
