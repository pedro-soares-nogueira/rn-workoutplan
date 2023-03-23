import {
  Image,
  Heading,
  HStack,
  Text,
  Box,
  ScrollView,
  useToast,
} from "native-base"
import { TouchableOpacity } from "react-native"
import { Icon, VStack } from "native-base"
import { Feather } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "../routes/app.routes"
import BodySvg from "../assets/body.svg"

import SeriesSvg from "../assets/series.svg"
import RepetitionsSvg from "../assets/repetitions.svg"
import { Button } from "../components/Button"
import { useEffect, useState } from "react"
import { ExerciseDTO } from "../dtos/Exercise.DTO"
import { AppError } from "../utils/AppError"
import { api } from "../services/api"
import { Loading } from "../components/Loading"

type RouteParamsProps = {
  exerciseId: string
}

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const [isLoading, setIsLoading] = useState(true)
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)
  const route = useRoute()
  const toast = useToast()
  const { exerciseId } = route.params as RouteParamsProps

  function handleGoBack() {
    navigation.goBack()
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true)
      const response = await api.get(`/exercises/${exerciseId}`)

      setExercise(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os detalhes do exercício"

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchExerciseDetails()
  }, [exerciseId])

  return (
    <ScrollView>
      <VStack flex={1}>
        <VStack px={6} bg="gray.600" pt={"70px"} pb="6">
          <TouchableOpacity onPress={handleGoBack}>
            <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
          </TouchableOpacity>

          <HStack justifyContent="space-between" mt={8} alignItems="center">
            <Heading
              color="gray.100"
              fontSize="lg"
              flexShrink={1}
              fontFamily="heading"
            >
              {exercise.name}
            </Heading>

            <HStack alignItems="center">
              <BodySvg />

              <Text color="gray.200" ml={1} textTransform="capitalize">
                {exercise.group}
              </Text>
            </HStack>
          </HStack>
        </VStack>
        {isLoading ? (
          <Box flex={1} h={96}>
            <Loading />
          </Box>
        ) : (
          <VStack p={8}>
            <Box rounded="lg" mb={3} overflow="hidden">
              <Image
                w="full"
                h={"96"}
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise?.demo}`,
                }}
                alt="Nome do exercício"
                resizeMode="cover"
                rounded="lg"
              />
            </Box>
            <Box bg="gray.600" rounded="md" pb={4} px={4} mt={5}>
              <HStack
                alignItems="center"
                justifyContent="space-around"
                mb={6}
                mt={5}
              >
                <HStack alignItems={"center"}>
                  <SeriesSvg />
                  <Text color="gray.200" ml="2" fontSize={"md"}>
                    {exercise.series} séries
                  </Text>
                </HStack>

                <HStack alignItems={"center"}>
                  <RepetitionsSvg />
                  <Text color="gray.200" ml="2" fontSize={"md"}>
                    {exercise.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>

              <Button title="Marcar como realizado" />
            </Box>
          </VStack>
        )}
      </VStack>
    </ScrollView>
  )
}
