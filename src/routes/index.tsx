import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import { AuthRoutes } from "./auth.routes";
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const themeStyled = useTheme()

  const { seller, isLoadingSellerStorageData } = useAuth();

  const theme = DefaultTheme
  theme.colors.background = themeStyled.COLORS.BACKGROUND;

  if(isLoadingSellerStorageData) {
    return <Loading />
  }

  return (
    <NavigationContainer theme={theme}>
      {seller.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}