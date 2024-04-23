import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { lightTheme } from './Theme'
import { ThemeProvider } from '@mui/material'

function App (): JSX.Element {
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
