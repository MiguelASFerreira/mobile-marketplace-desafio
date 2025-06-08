import { View } from "react-native";
import styled from "styled-components/native";

export const Container = styled(View)`
  width: 167px;
  height: 190px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
`;

export const ProductImage = styled.Image`
  width: 100%;
  height: 96px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

export const ProductInfo = styled.View`
  padding: 8px;
`;

export const ProductName = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.TEXT_SM}px;
  color: ${({ theme }) => theme.COLORS.GRAY_400};
`;

export const PriceLabel = styled.Text`
  margin-top: 4px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.TEXT_XS}px;
  color: ${({ theme }) => theme.COLORS.GRAY_500};
`;

export const PriceValue = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.TEXT_MD}px;
  color: ${({ theme }) => theme.COLORS.GRAY_500};
`;
