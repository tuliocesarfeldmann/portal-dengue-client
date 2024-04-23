import { createTheme } from '@mui/material/styles'

export const colors = {
  background: '#008BDA',
  foreground: '#FFFFFF',
  selectedBackground: '#FFFFFF',
  selectedForeground: '#0072F0'
}

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#008BDA'
    }
  }
})
