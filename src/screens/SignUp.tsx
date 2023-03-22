import { useNavigation } from "@react-navigation/native"
import { VStack, Image, Center, Text, Heading, ScrollView } from "native-base"

import BackgroundImg from "../assets/background.png"
import LogoSvg from "../assets/logo.svg"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { AuthNavigatorRoutesProps } from "../routes/auth.routes"

export function SignUp() {
  const navigation = useNavigation()

  const handleGoBack = () => {
    navigation.goBack()
  }
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
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
            Crie Sua conta
          </Heading>

          <Input placeholder="Nome" />

          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input placeholder="Senha" secureTextEntry />

          <Button title="Criar e acessar" />
        </Center>
        <Center px={10} mt={"48"}>
          <Button
            title="Voltar para login"
            variant={"outline"}
            onPress={handleGoBack}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}
