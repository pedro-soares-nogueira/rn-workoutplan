import { StatusBar, View } from "react-native"
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins"
import { NativeBaseProvider } from "native-base"
import { Loading } from "./src/components/Loading"
import { THEME } from "./src/theme"
import { SignIn } from "./src/screens/SignIn"

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"transparent"}
        translucent
      />
      {fontsLoaded ? <SignIn /> : <Loading />}
    </NativeBaseProvider>
  )
}
