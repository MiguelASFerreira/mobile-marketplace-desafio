import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components/native";

import StoreSvg from "@assets/store.svg";
import UserSvg from "@assets/user.svg";

import { Home } from "@screens/Home";
import { Profile } from "@screens/Profile";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Product } from "@screens/Product";

type AppRoutes = {
  home: undefined;
  profile: undefined;
  product: {
    productId: string;
  };
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.COLORS.ORANGE_BASE,
        tabBarInactiveTintColor: theme.COLORS.GRAY_200,
        tabBarStyle: {
          backgroundColor: theme.COLORS.BACKGROUND,
          borderTopWidth: 0,
          paddingBottom: insets.bottom || 10,
          height: 60 + (insets.bottom || 0),
        },
        tabBarLabelStyle: {
          fontSize: 12,
          paddingTop: 4,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: "PRODUTOS",
          tabBarIcon: ({ color }) => (
            <StoreSvg fill={color} width={24} height={24} />
          ),
        }}
      />

      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarLabel: "PERFIL",
          tabBarIcon: ({ color }) => (
            <UserSvg fill={color} width={24} height={24} />
          ),
        }}
      />

      <Screen
        name="product"
        component={Product}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  );
}
