import { VStack, Image } from "native-base"
import { Text } from "react-native"

import BackgroundImg from "../assets/background.png"

export function SignIn() {
  return (
    <VStack flex={1} bg="gray.700">
      <Image
        source={BackgroundImg}
        alt="Pessoas treinando"
        resizeMode="stretch"
        position="absolute"
        width={"100%"}
      />
    </VStack>
  )
}
