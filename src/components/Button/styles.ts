import styled, { css } from "styled-components/native";
import { ButtonVariant, ButtonSize } from "./";
import { TouchableOpacity } from "react-native";

interface ContainerProps {
  variant: ButtonVariant;
  size: ButtonSize;
}

interface ContentProps {
  alignLeft?: boolean;
  alignRight?: boolean;
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  flex-direction: row;
  align-items: center;
  border-radius: 8px;

  ${({ variant, theme }) =>
    variant === "solid"
      ? css`
          background-color: ${theme.COLORS.ORANGE_BASE};
          border-width: 0px;
        `
      : css`
          background-color: transparent;
          border-width: 1.5px;
          border-color: ${theme.COLORS.ORANGE_BASE};
        `}

  ${({ size }) =>
    size === "medium"
      ? css`
          height: 56px;
          padding: 0 16px;
        `
      : css`
          height: 40px;
          padding: 0 12px;
        `}
`;

export const Side = styled.View`
  width: 24px;
  align-items: center;
  justify-content: center;
`;

export const IconContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View<ContentProps>`
  flex: 1;

  ${({ alignLeft }) =>
    alignLeft &&
    css`
      align-items: flex-start;
    `}

  ${({ alignRight }) =>
    alignRight &&
    css`
      align-items: flex-end;
    `}

  ${({ alignLeft, alignRight }) =>
    !alignLeft &&
    !alignRight &&
    css`
      align-items: center;
    `}

  justify-content: center;
`;

export const Title = styled.Text<{ variant: ButtonVariant }>`
  font-size: 16px;
  font-weight: 500;

  ${({ variant, theme }) =>
    variant === "solid"
      ? css`
          color: ${theme.COLORS.BACKGROUND};
        `
      : css`
          color: ${theme.COLORS.ORANGE_BASE};
        `}
`;
