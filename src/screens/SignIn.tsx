import { VStack, Image, Center, Text, Heading } from "native-base"

import BackgroundImg from "../assets/background.png"
import LogoSvg from "../assets/logo.svg"
import { Button } from "../components/Button"
import { Input } from "../components/Input"

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

      <Center my={24}>
        <LogoSvg />

        <Text color="gray.100" fontSize="md">
          Treine sua mente e o seu corpo.
        </Text>
      </Center>

      <Center px={10}>
        <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
          Acesse a conta
        </Heading>

        <Input
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input placeholder="Senha" secureTextEntry />

        <Button title="Acessar" />
      </Center>
    </VStack>
  )
}
