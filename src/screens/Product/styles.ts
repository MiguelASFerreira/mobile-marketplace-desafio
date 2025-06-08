import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 24,
  },
})``;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

export const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-right: 8px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.TEXT_MD}px;
  color: ${({ theme }) => theme.COLORS.ORANGE_BASE};
`;

export const ProductImage = styled.Image`
  width: 100%;
  height: 180px;
  border-radius: 12px;
  margin-bottom: 16px;
`;

export const ProductTitle = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.TITLE_SM}px;
  color: ${({ theme }) => theme.COLORS.GRAY_500};
`;

export const ProductPrice = styled.Text`
  position: absolute;
  right: 24px;
  top: 265px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.TITLE_SM}px;
  color: ${({ theme }) => theme.COLORS.GRAY_500};
`;

export const Description = styled.Text`
  margin-top: 12px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.TEXT_SM}px;
  color: ${({ theme }) => theme.COLORS.GRAY_400};
`;

export const InfoText = styled.Text`
  margin-top: 8px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.TEXT_XS}px;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
`;

export const Category = styled.Text`
  margin-top: 16px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.TEXT_SM}px;
  color: ${({ theme }) => theme.COLORS.GRAY_400};
`;

export const Card = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.BLUE_LIGHT};
  padding: 12px;
  border-radius: 8px;
  margin-top: 20px;
`;

export const CardText = styled.Text`
  margin-left: 8px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.TEXT_XS}px;
  color: ${({ theme }) => theme.COLORS.GRAY_400};
`;

export const Footer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  align-items: center;
  justify-content: space-between;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.SHAPE};
`;

export const FooterPrice = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.TITLE_SM}px;
  color: ${({ theme }) => theme.COLORS.GRAY_500};
`;

export const ContactButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.COLORS.ORANGE_BASE};
  padding: 12px 20px;
  border-radius: 8px;
`;

export const ContactButtonText = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.TEXT_SM}px;
`;
