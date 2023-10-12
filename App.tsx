import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Myapp } from "./Myapp";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isFontLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

if(isFontLoaded) {
  SplashScreen.hideAsync()
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Myapp />
    </GestureHandlerRootView>
  )
}
}


