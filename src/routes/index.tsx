import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { useTheme, Box } from "native-base"
import { useAuth } from "../hooks/useAuth"

import { AppRoutes } from "./app.routes"
import { AuthRoutes } from "./auth.routes"

export function Routes() {
  const { colors } = useTheme()

  const theme = DefaultTheme
  theme.colors.background = colors.gray[700]
  const { user } = useAuth()

  console.log("USUÁRIO LOGADO =>", user)

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {/* <AppRoutes /> */}
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  )
}
