import { Snackbar, SnackbarContent } from '@mui/material'

interface PopupProps {
  open: boolean
  message: string
  color: string
  setPopupState: (state: boolean) => void
}

export default function Popup ({ open, message, color, setPopupState }: PopupProps): JSX.Element {
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string): void => {
    setPopupState(false)
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <SnackbarContent sx={{ bgcolor: color }} message={message}></SnackbarContent>
      </Snackbar>
    </>
  )
}
