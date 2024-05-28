import { Box, Button, Grid, Modal, Typography } from '@mui/material'
import MiniMapViewer from './Maps/MiniMapViewer'
import { useContext, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from 'src/util/util'
import { StatusEnum } from 'src/util/StatusEnum'
import { AuthContext } from 'src/AuthContext'
import MTextField from './MTextField'

interface ReportedPointProps {
  id: number
  lat: number
  lng: number
  description: string
}

interface AddressInfo {
  road: string | undefined
  neighborhood: string | undefined
  town: string | undefined
  state: string | undefined
  region: string | undefined
  postcode: string | undefined
  country: string | undefined
  countryCode: string | undefined
}

export default function ReportedPoint ({ id, lat, lng, description }: ReportedPointProps): JSX.Element {
  const { email, password } = useContext(AuthContext)

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [validForm, setValidForm] = useState<boolean>(true)
  const [addressInfo, setAddressInfo] = useState<AddressInfo>({
    road: undefined,
    neighborhood: undefined,
    town: undefined,
    state: undefined,
    region: undefined,
    postcode: undefined,
    country: undefined,
    countryCode: undefined
  })

  const acceptColor = '#10A81F'
  const refuseColor = '#CD0707'

  const validateForm = (): boolean => {
    return addressInfo.road !== undefined && addressInfo.road.length > 0
  }

  function handleAccept (): void {
    if (email === undefined || password === undefined) return

    axios.get(BASE_URL + '/point/address/details', {
      params: {
        lat,
        lon: lng
      },
      auth: {
        username: email,
        password
      }
    })
      .then(response => {
        setAddressInfo(response.data)
        setModalOpen(true)
      })
      .catch(error => { console.log(error) })
  }

  function handleRefuse (): void {
    if (email === undefined || password === undefined) return

    axios.post(BASE_URL + '/point/updateStatus', {
      pointId: id,
      status: StatusEnum.REJECTED
    },
    {
      auth: {
        username: email,
        password
      }
    })
      .then(_ => {
        window.location.reload()
      })
      .catch(error => { console.log(error) })
  }

  function handleModalClose (): void {
    setModalOpen(false)
  }

  function handleFinalConfirmation (): void {
    if (email === undefined || password === undefined) return

    if (validateForm()) {
      axios.post(BASE_URL + '/point/confirm', {
        point: {
          id
        },
        address: addressInfo
      },
      {
        auth: {
          username: email,
          password
        }
      })
        .then(_ => {
          window.location.reload()
        })
        .catch(error => { console.log(error) })
      return
    }

    setValidForm(false)
  }

  return (
    <>
      <Grid item display={'flex'} flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent={'center'} xs={12} marginY={2}>
        <Grid item xs={12} md={5} padding={{ xs: 1, md: 2 }}>
          <MiniMapViewer lat={lat} lng={lng} />
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
              <Button
                variant='contained'
                sx={{ padding: 1, margin: { xs: 1, md: 1 }, background: refuseColor }}
                onClick={handleRefuse}
              >
                Recusar
              </Button>
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
            <Grid item xs={12} md={7}>
              <MTextField
                label={'Rua'}
                name={'road'}
                type={'text'}
                defaultValue={addressInfo.road}
                margin={'dense'}
                autoFocus={true}
                required={true}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setAddressInfo({ ...addressInfo, road: event.target.value }) }}
                error={!validForm}
                helperText={!validForm && addressInfo.road?.length === 0 && 'Informe a rua'}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <MTextField
                label={'Bairro'}
                name={'neighborhood'}
                type={'text'}
                defaultValue={addressInfo.neighborhood}
                margin={'dense'}
                autoFocus={true}
                required={true}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <MTextField
                label={'Cidade'}
                name={'town'}
                type={'text'}
                defaultValue={addressInfo.town}
                margin={'dense'}
                autoFocus={true}
                required={true}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <MTextField
                label={'Estado'}
                name={'state'}
                type={'text'}
                defaultValue={addressInfo.state}
                margin={'dense'}
                autoFocus={true}
                required={true}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <MTextField
                label={'Pais'}
                name={'country'}
                type={'text'}
                defaultValue={addressInfo.country}
                margin={'dense'}
                autoFocus={true}
                required={true}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <MTextField
                label={'CEP'}
                name={'postcode'}
                type={'text'}
                defaultValue={addressInfo.postcode}
                margin={'dense'}
                autoFocus={true}
                required={true}
                disabled={true}
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
