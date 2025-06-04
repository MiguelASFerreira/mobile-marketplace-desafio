import { SafeAreaView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 24px;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 64px 0 24px 0;
`;

export const ProfileImage = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 12px;
`;

export const ProfileContent = styled.View`
  flex: 1;
  margin-left: 16px;
  justify-content: center;
`;

export const ProfileName = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_500};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.TEXT_MD}px;
`;

export const ProfileView = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

export const ProfileViewText = styled.Text`
  color: ${({ theme }) => theme.COLORS.ORANGE_BASE};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.TEXT_SM}px;
  margin-right: 4px;
`;

export const SearchTitle = styled.Text`
  padding-top: 32px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.TEXT_SM}px;
`;

export const SearchContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  width: 90%;
  gap: 12px;
`;


export const FilterButton = styled(TouchableOpacity)`
  width: 44px;
  height: 44px;
  border: 1px solid ${({ theme }) => theme.COLORS.ORANGE_BASE};
  border-radius: 12px;
  align-items: center;
  justify-content: center;
`;
