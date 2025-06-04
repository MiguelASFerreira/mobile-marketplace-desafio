import React from "react";
import { ActivityIndicator, TouchableOpacityProps } from "react-native";
import { useTheme } from "styled-components/native";
import { LucideProps } from "lucide-react-native";

import { Container, Title, IconContainer, Content } from "./styles";
import { Loading } from "@components/Loading";

export type ButtonVariant = "solid" | "outline";
export type ButtonSize = "medium" | "small";

export interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  LeftIcon?: React.ComponentType<LucideProps>;
  RightIcon?: React.ComponentType<LucideProps>;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "solid",
  size = "medium",
  LeftIcon,
  RightIcon,
  isLoading,
  ...rest
}) => {
  const theme = useTheme();
  const iconColor =
    variant === "solid" ? theme.COLORS.BACKGROUND : theme.COLORS.ORANGE_BASE;

  return (
    <Container
      variant={variant}
      size={size}
      disabled={isLoading || rest.disabled}
      {...rest}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {LeftIcon && (
            <IconContainer>
              <LeftIcon size={20} color={iconColor} />
            </IconContainer>
          )}

          <Content alignLeft={!!RightIcon} alignRight={!!LeftIcon}>
            {title && <Title variant={variant}>{title}</Title>}
          </Content>

          {RightIcon && (
            <IconContainer>
              <RightIcon size={20} color={iconColor} />
            </IconContainer>
          )}
        </>
      )}
    </Container>
  );
};
