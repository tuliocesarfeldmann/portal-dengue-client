import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material'
import MiniMapViewer from './Maps/MiniMapViewer'
import { useState } from 'react'

interface ReportedPointProps {
  lat: number
  lng: number
  description: string
}

// interface AddressInfo {
//   road: string | undefined
//   number: number | string | undefined
//   neighborhood: string | undefined
//   city: string | undefined
//   state: string | undefined
// }

export default function ReportedPoint ({ lat, lng, description }: ReportedPointProps): JSX.Element {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const acceptColor = '#10A81F'
  const refuseColor = '#CD0707'
  function handleAccept (): void {
    setModalOpen(true)
  }

  // function handleRefuse (): void {
  // }

  function handleModalClose (): void {
    setModalOpen(false)
  }

  function handleFinalConfirmation (): void {
  }

  return (
    <>
      <Grid item display={'flex'} flexDirection={{ xs: 'column', md: 'row' }}
      justifyContent={'center'} xs={12} marginY={2}>
        <Grid item xs={12} md={5} padding={{ xs: 1, md: 2 }}>
          <MiniMapViewer lat={lat} lng={lng}/>
        </Grid>
        <Grid item display={'flex'} flexDirection={'column'} xs={12} md={7} padding={{ xs: 1, md: 2 }}>
          <Grid item >
            <Typography fontWeight={700} marginBottom={2}>
              Descrição
            </Typography>
            <Typography>
              {description}
            </Typography>
          </Grid>
          <Grid container
            display={'flex'} flexDirection={'row'} flexGrow={1}
            justifyContent={{ xs: 'center', md: 'end' }} alignContent={'end'}
          >
            <Grid item >
              <Button
                variant='contained'
                sx={{ padding: 1, margin: { xs: 1, md: 1 }, background: acceptColor }}
                onClick={handleAccept}
              >
                Aceitar
              </Button>
            </Grid>
            <Grid item >
              <Button variant='contained' sx={{ padding: 1, margin: { xs: 1, md: 1 }, background: refuseColor }}>Recusar</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-address"
        aria-describedby="modal-modal-description"
        >
        <Box sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: '60%' },
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4
        }}>
          <Typography textAlign={'center'} fontWeight={700} fontSize={24} marginBottom={2}>
            Confirme os dados do endereço
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth={true}
                variant='outlined'
                label='Rua'
                margin='dense'
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth={true}
                variant='outlined'
                label='Número'
                margin='dense'
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth={true}
                variant='outlined'
                label='Bairro'
                margin='dense'
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth={true}
                variant='outlined'
                label='Cidade'
                margin='dense'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth={true}
                variant='outlined'
                label='Estado'
                margin='dense'
              />
            </Grid>
            <Grid item xs={12} display={'flex'} justifyContent={'center'}>
              <Button
                variant='contained'
                sx={{ padding: 1, margin: { xs: 1, md: 1 }, background: acceptColor }}
                onClick={handleFinalConfirmation}
              >
                Confirmar dados
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  )
}
