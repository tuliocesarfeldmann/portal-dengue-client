import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { lightTheme } from './Theme'
import { ThemeProvider } from '@mui/material'
import { AuthProvider } from './AuthContext'

export function App (): JSX.Element {
  return (
    <ThemeProvider theme={lightTheme}>
      <AuthProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
