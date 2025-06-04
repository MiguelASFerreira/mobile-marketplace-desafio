import { SafeAreaView } from "react-native";
import styled from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  padding: 64px 40px 0px 40px;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  gap: 15px;
`;

export const Logo = styled.Image`
  width: 64px;
  height: 48px;
  margin-bottom: 40px;
  align-self: center;
`;

export const Title = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.COLORS.GRAY_500};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.TITLE_MD}px;
`;

export const Subtitle = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.TEXT_SM}px;
  margin-bottom: 41px;
`;

export const Footer = styled.View`
  gap: 8px;
  margin-top: 61px;
  margin-bottom: 48px;
`;

export const FooterText = styled.Text`
  text-align: left;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.TEXT_SM}px;
`;
