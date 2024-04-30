import { Box, Button } from '@mui/material'
import { colors } from 'src/Theme'

interface Props {
  onClick: React.MouseEventHandler
  selected: boolean
  children?: any
}

export default function DrawerButton (props: Props): JSX.Element {
  return (
    <Box sx={{
      backgroundColor: props.selected ? colors.selectedBackground : colors.background,
      color: props.selected ? colors.selectedForeground : colors.foreground,
      borderRadius: '10px',
      width: '95%'
    }}>
      <Button onClick={props.onClick}
        sx={{
          color: props.selected ? colors.selectedForeground : colors.foreground,
          borderRadius: '10px',
          width: '100%',
          fontWeight: 700,
          fontSize: '1.2em'
        }}>
        {props.children}
      </Button>
    </Box >
  )
}
