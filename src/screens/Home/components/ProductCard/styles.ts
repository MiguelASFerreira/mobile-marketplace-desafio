import { SafeAreaView } from "react-native";
import styled from "styled-components/native";

export const Container = styled(SafeAreaView)`
  width: 160px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  border-radius: 12px;
  overflow: hidden;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
`;

export const ProductImage = styled.Image`
  width: 100%;
  height: 100px;
  border-radius: 8px;
`;

export const ProductName = styled.Text`
  margin-top: 8px;
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

