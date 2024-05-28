import React, { createContext, useMemo, useState } from 'react'

interface AuthContextData {
  email: string | undefined
  setEmail: React.Dispatch<React.SetStateAction<string | undefined>>
  password: string | undefined
  setPassword: React.Dispatch<React.SetStateAction<string | undefined>>
  isUserLogged: () => boolean
  clearAuth: () => void
}

export const AuthContext = createContext<AuthContextData>({} as unknown as AuthContextData)

export function AuthProvider ({ children }: { children: JSX.Element }): JSX.Element {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const isUserLogged = (): boolean => {
    return email !== undefined && password !== undefined
  }

  const clearAuth = (): void => {
    localStorage.clear()
    setEmail(undefined)
    setPassword(undefined)
  }

  useMemo(() => {
    const savedEmail = localStorage.getItem('email')
    const savedPassword = localStorage.getItem('password')

    if (savedEmail !== null && savedPassword !== null) {
      setEmail(savedEmail)
      setPassword(savedPassword)
    }
  }, [])

  return <AuthContext.Provider
    value={{
      email,
      password,
      setEmail,
      setPassword,
      isUserLogged,
      clearAuth
    }}
  >
    {children}
  </AuthContext.Provider>
}
