import { createContext, ReactNode, useState } from "react"
import { UserDTO } from "../dtos/UserDTO"

export type AuthContextDataProps = {
  user: UserDTO
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
)

type AuthContextProviderProps = {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)

  return (
    <AuthContext.Provider
      value={{
        user: {
          id: "1",
          name: "Pedro soares",
          email: "pedro@email.com",
          avatar: "pedro.png",
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
