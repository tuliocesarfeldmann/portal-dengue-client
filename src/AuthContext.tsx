import React, { createContext, useState } from 'react'

interface AuthContextData {
  email: string | undefined
  setEmail: React.Dispatch<React.SetStateAction<string | undefined>>
  password: string | undefined
  setPassword: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const AuthContext = createContext<AuthContextData>({} as unknown as AuthContextData)

export function AuthProvider ({ children }: { children: JSX.Element }): JSX.Element {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  return <AuthContext.Provider
    value={{
      email,
      password,
      setEmail,
      setPassword
    }}
  >
    {children}
  </AuthContext.Provider>
}
