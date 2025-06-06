import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";

export const Container = styled.View`
  padding: 24px;
  gap: 24px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.COLORS.GRAY_400};
`;

export const CloseButton = styled(TouchableOpacity)`
  padding: 4px;
`;

export const Content = styled.View`
  flex-direction: row;
  gap: 16px;
`;

export const Column = styled.View`
  flex: 1;
`;

export const CategorySection = styled.View`
  gap: 12px;
`;

export const FilterLabel = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.COLORS.GRAY_400};
`;

export const CategoryList = styled.View`
  gap: 12px;
`;

export const CategoryItem = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const CategoryName = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.GRAY_400};
`;

export const Footer = styled.View`
  flex-direction: row;
  gap: 12px;
  margin-top: 8px;
`;

export const StyledCheckbox = styled(Checkbox).attrs(({ theme, value }) => ({
  color: theme.COLORS.ORANGE_BASE,
}))`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border-width: 1.5px;
  border-color: ${({ value, theme }) =>
    value ? theme.COLORS.ORANGE_BASE : theme.COLORS.GRAY_200};
  background-color: ${({ value, theme }) =>
    value ? theme.COLORS.ORANGE_BASE : "transparent"};
`;