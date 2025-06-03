import React, { forwardRef } from "react";
import { AlertCircle, type LucideProps } from "lucide-react-native";

import { TextInputProps } from "react-native";
import {
  Container,
  Label,
  InputWrapper,
  StyledInput,
  IconWrapper,
  ErrorWrapper,
  ErrorText,
} from "./styles";
import { useTheme } from "styled-components/native";

export interface InputProps extends TextInputProps {
  error?: string;
  label?: string;
  LeftIcon?: React.ComponentType<LucideProps>;
  RightIcon?: React.ComponentType<LucideProps>;
}

export const Input = forwardRef<any, InputProps>(
  ({ error, label, LeftIcon, RightIcon, ...props }, ref) => {
    const theme = useTheme();
    return (
      <Container>
        {label && <Label>{label}</Label>}

        <InputWrapper isErrored={!!error}>
          {LeftIcon && (
            <IconWrapper>
              <LeftIcon
                size={24}
                color={error ? theme.COLORS.DANGER : theme.COLORS.GRAY_200}
              />
            </IconWrapper>
          )}

          <StyledInput
            ref={ref}
            placeholderTextColor={theme.COLORS.GRAY_200}
            {...props}
          />

          {RightIcon && (
            <IconWrapper>
              <RightIcon size={24} color={theme.COLORS.GRAY_200} />
            </IconWrapper>
          )}
        </InputWrapper>

        {error && (
          <ErrorWrapper>
            <AlertCircle size={16} color={theme.COLORS.DANGER} />
            <ErrorText>{error}</ErrorText>
          </ErrorWrapper>
        )}
      </Container>
    );
  }
);

Input.displayName = "Input";
