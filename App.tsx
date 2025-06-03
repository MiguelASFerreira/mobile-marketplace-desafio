import { StatusBar } from "react-native";
import { Text } from "react-native";
import { useFonts, DMSans_700Bold } from "@expo-google-fonts/dm-sans";
import {
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";

import theme from "./src/theme";
import { ThemeProvider } from "styled-components";
import { Loading } from "@components/Loading/";

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
  });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? (
        <Text>Open up App.tsx to start working on your app!</Text>
      ) : (
        <Loading />
      )}
    </ThemeProvider>
  );
}
