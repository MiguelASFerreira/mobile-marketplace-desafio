import React from "react";
import { TouchableOpacityProps } from "react-native";
import { LucideProps } from "lucide-react-native";

import {
  Container,
  Title,
  IconContainer,
  Content,
  Side
} from "./styles";
import { useTheme } from "styled-components/native";

export type ButtonVariant = "solid" | "outline";
export type ButtonSize = "medium" | "small";

export interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  LeftIcon?: React.ComponentType<LucideProps>;
  RightIcon?: React.ComponentType<LucideProps>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "solid",
  size = "medium",
  LeftIcon,
  RightIcon,
  ...rest
}) => {
  const theme = useTheme()
  const iconColor = variant === "solid" ? theme.COLORS.BACKGROUND : theme.COLORS.ORANGE_BASE;

  return (
    <Container variant={variant} size={size} {...rest}>
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
    </Container>
  );
};
