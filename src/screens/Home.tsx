import { Center, FlatList, Heading, HStack, Text, VStack } from "native-base"
import { useState } from "react"
import { ExerciseCard } from "../components/ExerciseCard"
import { Group } from "../components/Group"
import { HomeHeader } from "../components/HomeHeader"

export function Home() {
  const [groups, setGroups] = useState([
    "costas",
    "peito",
    "pernas",
    "biceps",
    "ombros",
    "triceps",
  ])
  const [exercises, setExercises] = useState([
    "Puxada frontal",
    "Remada curvada",
    "Remada unilateral",
    "Levantamento terras",
  ])
  const [groupSelected, setGroupSelected] = useState("costas")

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
      />

      <VStack px={6}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="2xl">
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
        renderItem={({ item }) => <ExerciseCard />}
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
