import { useNavigation } from "@react-navigation/native"
import {
  VStack,
  Image,
  Center,
  Text,
  Heading,
  ScrollView,
  useToast,
} from "native-base"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

import BackgroundImg from "../assets/background.png"
import LogoSvg from "../assets/logo.svg"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { useAuth } from "../hooks/useAuth"
import { AuthNavigatorRoutesProps } from "../routes/auth.routes"
import { AppError } from "../utils/AppError"

type FormData = {
  email: string
  password: string
}

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const toast = useToast()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const handleNewAccount = () => {
    navigation.navigate("signUp")
  }

  const handleSignIn = async ({ email, password }: FormData) => {
    try {
      setIsLoading(true)
      await signIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : "Não foi possível entrar. Tente novamente mais tarde."

      setIsLoading(false)
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      })
    }
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
            Acesse a conta
          </Heading>

          <Controller
            control={control}
            name="email"
            rules={{ required: "Informe o e-mail" }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{ required: "Informe a senha" }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button
            title="Acessar"
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />
        </Center>

        <Center px={10} mt="48" mb="20">
          <Text color="gray.100" fontSize="md" mb="3">
            Ainda não tem conta?
          </Text>
          <Button
            title="Criar Conta"
            variant={"outline"}
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}
