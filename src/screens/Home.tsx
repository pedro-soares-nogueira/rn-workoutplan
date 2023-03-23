import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { FlatList, Heading, HStack, Text, useToast, VStack } from "native-base"
import { useCallback, useEffect, useState } from "react"
import { ExerciseCard } from "../components/ExerciseCard"
import { Group } from "../components/Group"
import { HomeHeader } from "../components/HomeHeader"
import { Loading } from "../components/Loading"
import { ExerciseDTO } from "../dtos/Exercise.DTO"
import { AppNavigatorRoutesProps } from "../routes/app.routes"
import { api } from "../services/api"
import { AppError } from "../utils/AppError"

export function Home() {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<string[]>([])
  const [exercises, setExercises] = useState<ExerciseDTO[]>([])
  const [groupSelected, setGroupSelected] = useState("costas")

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails() {
    navigation.navigate("exercise")
  }

  const fetchGroups = async () => {
    try {
      const response = await api.get("/groups")
      setGroups(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os grupos musculares"

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      })
    }
  }

  const fecthExercisesByGroup = async () => {
    try {
      setIsLoading(true)
      const response = await api.get(`/exercises/bygroup/${groupSelected}`)
      setExercises(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os exercícios"

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
    fetchGroups()
  }, [])

  useFocusEffect(
    useCallback(() => {
      fecthExercisesByGroup()
    }, [groupSelected])
  )

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={
              groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()
            }
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 4 }}
        my={8}
        maxH={10}
        minH={10}
      />
      <VStack px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>
      </VStack>
      {isLoading ? (
        <Loading />
      ) : (
        <VStack px={8}>
          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard onPress={handleOpenExerciseDetails} data={item} />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{
              paddingBottom: 20,
            }}
          />
        </VStack>
      )}
    </VStack>
  )
}
