import React, { forwardRef, useState, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";

import { Input, InputProps } from "@components/Input";
import { useTheme } from "styled-components/native";
import type { LucideProps } from "lucide-react-native";

type IconToggleProps = LucideProps & {
  isShown: boolean;
  onToggle: () => void;
};

const PasswordVisibilityToggle = ({
  isShown,
  onToggle,
  color,
  size = 24,
  ...props
}: IconToggleProps) => {
  const Icon = isShown ? EyeOff : Eye;

  return (
    <TouchableOpacity onPress={onToggle} accessibilityLabel="Alternar visibilidade da senha">
      <Icon color={color} size={size} {...props} />
    </TouchableOpacity>
  );
};

export const PasswordInput = forwardRef<any, Omit<InputProps, "type">>(
  ({ ...props }, ref) => {
    const theme = useTheme();
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    const togglePasswordShown = useCallback(() => {
      setIsPasswordShown((prev) => !prev);
    }, []);

    // Este componente será passado como referência, não função inline
    const RightIcon = (iconProps: LucideProps) => (
      <PasswordVisibilityToggle
        isShown={isPasswordShown}
        onToggle={togglePasswordShown}
        color={theme.COLORS.GRAY_500}
        {...iconProps}
      />
    );

    return (
      <Input
        ref={ref}
        secureTextEntry={!isPasswordShown}
        RightIcon={RightIcon}
        {...props}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";
