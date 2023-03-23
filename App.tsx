import { StatusBar, View } from "react-native"
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins"
import { NativeBaseProvider } from "native-base"
import { Loading } from "./src/components/Loading"
import { THEME } from "./src/theme"
import { Routes } from "./src/routes"
import { AuthContextProvider } from "./src/contexts/AuthContext"

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
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  )
}
