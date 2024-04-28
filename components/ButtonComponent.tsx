import { Button, ThemeName } from "tamagui";
import React from "react";

interface ButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  theme: ThemeName | undefined;
  flex?: number | undefined;
  themeInverse?: boolean | undefined;
  backgroundColor?: string;
  disabled?: boolean | undefined;
  opacity?: number | undefined;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  onPress,
  children,
  themeInverse,
  theme,
  backgroundColor,
  flex,
  disabled,
  opacity,
}) => {
  return (
    <Button
      onPress={onPress}
      themeInverse={themeInverse}
      size="$6"
      fontSize="$7"
      borderRadius="$10"
      flex={flex}
      disabled={disabled}
      opacity={opacity}
      backgroundColor={backgroundColor}
      theme={theme}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;
