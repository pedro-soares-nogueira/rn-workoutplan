import { createContext, ReactNode, useEffect, useState } from "react"
import { UserDTO } from "../dtos/UserDTO"
import { api } from "../services/api"
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "../storage/storageAuthToken"
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from "../storage/storageUser"

export type AuthContextDataProps = {
  user: UserDTO
  singIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isLoadingUserStorageData: boolean
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
)

type AuthContextProviderProps = {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  const userAndTokenUpdate = async (userData: UserDTO, token: string) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`
    setUser(userData)
  }

  const storageUserAndTokenSave = async (userData: UserDTO, token: string) => {
    try {
      setIsLoadingUserStorageData(true)

      await storageAuthTokenSave(token)
      await storageUserSave(userData)
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  const singIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/sessions", { email, password })

      if (data.user && data.token) {
        await storageUserAndTokenSave(data.user, data.token)
        userAndTokenUpdate(data.user, data.token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  const loadUserData = async () => {
    try {
      setIsLoadingUserStorageData(true)

      const userLogged = await storageUserGet()
      const token = await storageAuthTokenGet()

      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  const signOut = async () => {
    try {
      setIsLoadingUserStorageData(true)
      setUser({} as UserDTO)
      await storageUserRemove()
      await storageAuthTokenRemove()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        singIn,
        signOut,
        isLoadingUserStorageData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
