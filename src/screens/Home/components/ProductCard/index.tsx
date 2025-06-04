import React from "react";
import {
  Container,
  ProductImage,
  ProductName,
  PriceLabel,
  PriceValue,
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
  const imageUrl = product.attachments[0]?.url;

  return (
    <Container>
      {imageUrl && <ProductImage source={{ uri: imageUrl }} resizeMode="cover" />}
      <ProductName>{product.title}</ProductName>
      <PriceLabel>
        R$ <PriceValue>{priceInReais.toFixed(2).replace(".", ",")}</PriceValue>
      </PriceLabel>
    </Container>
  );
}
