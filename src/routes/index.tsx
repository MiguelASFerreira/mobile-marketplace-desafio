import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import { useTheme } from "styled-components/native";

export function Routes() {
  const themeStyled = useTheme()

  const theme = DefaultTheme
  theme.colors.background = themeStyled.COLORS.BACKGROUND;

  return (
    <NavigationContainer theme={theme}>
      <AppRoutes />
    </NavigationContainer>
  )
}