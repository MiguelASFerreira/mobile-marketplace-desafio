import React from "react";
import {
  Container,
  ProductImage,
  ProductName,
  PriceLabel,
  PriceValue,
  ProductInfo,
} from "./styles";

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
};

export function ProductCard({ product }: ProductCardProps) {
  const priceInReais = product.priceInCents / 100;
  const fullUrl = product.attachments[0].url;
  const parts = fullUrl.split("/attachments/");
  const image = parts[1];

  return (
    <Container>
      <ProductImage
        source={{
          uri: `${process.env.EXPO_PUBLIC_API_URL}/attachments/${image}`,
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
  );
}
