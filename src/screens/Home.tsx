import { useNavigation } from "@react-navigation/native"
import { FlatList, Heading, HStack, Text, useToast, VStack } from "native-base"
import { useEffect, useState } from "react"
import { ExerciseCard } from "../components/ExerciseCard"
import { Group } from "../components/Group"
import { HomeHeader } from "../components/HomeHeader"
import { AppNavigatorRoutesProps } from "../routes/app.routes"
import { api } from "../services/api"
import { AppError } from "../utils/AppError"

export function Home() {
  const toast = useToast()
  const [groups, setGroups] = useState<string[]>([])
  const [exercises, setExercises] = useState([
    "Puxada frontal",
    "Remada curvada",
    "Remada unilateral",
    "Levantamento terras",
  ])
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

  useEffect(() => {
    fetchGroups()
  }, [])

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

      <VStack px={6}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="2xl" fontFamily="heading">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="lg" fontWeight={"bold"}>
            {exercises.length}
          </Text>
        </HStack>
      </VStack>

      <FlatList
        data={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <ExerciseCard onPress={handleOpenExerciseDetails} />
        )}
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{
          paddingBottom: 20,
          paddingLeft: 6,
          paddingRight: 6,
        }}
      />
    </VStack>
  )
}
