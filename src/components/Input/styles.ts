import { TextInput } from 'react-native'
import styled from 'styled-components/native'

interface InputWrapperProps {
  isErrored: boolean
}

export const Container = styled.View`
  width: 100%;
  padding-bottom: 4px;
`

export const Label = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.COLORS.GRAY_200}; 
  text-transform: uppercase;
  margin-bottom: 4px;
`

export const InputWrapper = styled.View<InputWrapperProps>`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ isErrored, theme }) => (isErrored ? theme.COLORS.DANGER : theme.COLORS.GRAY_200)};
  padding-bottom: 4px;
`

export const StyledInput = styled(TextInput).attrs(() => ({
  placeholderTextColor: "#949494",
}))`
  flex: 1;
  height: 62px;
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.GRAY_500};
`

export const IconWrapper = styled.View`
  padding-left: 4px;
  padding-right: 4px;
`

export const ErrorWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
  gap: 4px;
`

export const ErrorText = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.DANGER};
`
