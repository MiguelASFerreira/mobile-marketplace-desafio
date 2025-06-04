import styled from 'styled-components/native';
import { Upload } from 'lucide-react-native';

export const Container = styled.View`
  gap: 4px;
  align-items: center;
  justify-content: center;
`;

export const UploadArea = styled.View`
  width: 128px;
  height: 128px;
  background-color: ${({ theme }) => theme.COLORS.SHAPE};
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const UploadIcon = styled(Upload).attrs(({ theme }) => ({
  size: 32,
  color: theme.COLORS.ORANGE_BASE,
}))``;

export const LabelText = styled.Text`
  margin-top: 4px;
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
`;

export const ErrorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const ErrorText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.DANGER || '#F75A68'};
`;
