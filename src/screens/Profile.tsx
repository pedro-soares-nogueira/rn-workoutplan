import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from "native-base"
import { useState } from "react"
import { TouchableOpacity, Alert } from "react-native"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { ScreenHeader } from "../components/ScreenHeader"
import { UserPhoto } from "../components/UserPhoto"
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"

const PHOTO_SIZE = 33

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/pedro-soares-nogueira.png"
  )
  const toast = useToast()
  async function handleUserPhotoSelected() {
    setPhotoIsLoading(true)
    try {
      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })
      if (selectedPhoto.canceled) {
        return
      }

      if (selectedPhoto.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          selectedPhoto.assets[0].uri
        )
        /*
        //Validando tamanho imagem 
        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: "Essa imagem é muito grande. Escolha uma de até 5MB.",
            placement: "top",
            bgColor: "red.500",
          })
        } */
        setUserPhoto(selectedPhoto.assets[0].uri)

        toast.show({
          title: "Imagem alterada.",
          placement: "top",
          bgColor: "green.500",
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Seu perfil" />

      <ScrollView>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.300"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={{ uri: userPhoto }}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelected}>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="xl"
              mt={3}
              mb={8}
            >
              Alterar Foto
            </Text>
          </TouchableOpacity>

          <Input placeholder="Nome" bg={"gray.600"} />
          <Input value="ngrpedro22@gmail.com" bg={"gray.600"} isDisabled />
        </Center>

        <VStack px={10} mt={12} mb={9}>
          <Heading color="gray.200" fontSize="md" mb={2} fontFamily="heading">
            Alterar senha
          </Heading>

          <Input bg="gray.600" placeholder="Senha antiga" secureTextEntry />

          <Input bg="gray.600" placeholder="Nova senha" secureTextEntry />

          <Input
            bg="gray.600"
            placeholder="Confirme a nova senha"
            secureTextEntry
          />

          <Button title="Atualizar" mt={4} />
        </VStack>
      </ScrollView>
    </VStack>
  )
}
