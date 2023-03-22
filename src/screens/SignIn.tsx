import { VStack, Image, Center, Text, Heading, ScrollView } from "native-base"

import BackgroundImg from "../assets/background.png"
import LogoSvg from "../assets/logo.svg"
import { Button } from "../components/Button"
import { Input } from "../components/Input"

export function SignIn() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} bg="gray.700">
        <Image
          source={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="stretch"
          position="absolute"
          width={"100%"}
        />

        <Center my={24} mt={48}>
          <LogoSvg />

          <Text color="gray.100" fontSize="md">
            Treine sua mente e o seu corpo.
          </Text>
        </Center>

        <Center px={10} mt={"12"}>
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

        <Center px={10} mt="48" mb="20">
          <Text color="gray.100" fontSize="md" mb="3">
            Ainda não tem conta?
          </Text>
          <Button title="Criar Conta" variant={"outline"} />
        </Center>
      </VStack>
    </ScrollView>
  )
}
