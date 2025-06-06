import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const themeStyled = useTheme()

  const theme = DefaultTheme
  theme.colors.background = themeStyled.COLORS.BACKGROUND;

  return (
    <NavigationContainer theme={theme}>
      <AuthRoutes />
    </NavigationContainer>
  )
}