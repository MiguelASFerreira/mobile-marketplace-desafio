import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  `;

export const Content = styled.View`
  flex: 1;
  gap: 16px;
  padding: 64px 40px 19px;
`;

export const ProfileHeader = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`;

export const LogoutButton = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
`;
