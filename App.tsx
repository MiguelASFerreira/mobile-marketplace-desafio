import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { useFonts, DMSans_700Bold } from "@expo-google-fonts/dm-sans";
import {
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
  });
  return (
    <View>
      <StatusBar style="auto" />
      {fontsLoaded ? (
        <Text>Open up App.tsx to start working on your app!</Text>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
