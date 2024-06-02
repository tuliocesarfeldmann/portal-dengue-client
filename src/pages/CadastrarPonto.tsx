import { Button, Grid } from '@mui/material'
import ResponsiveDrawer from '../components/Drawer/ResponsiveDrawer'
import MapSelector, { type Point } from 'src/components/Maps/MapSelector'
import MTextField from 'src/components/MTextField'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from 'src/util/util'
import Popup from 'src/components/Popup'

export default function Home (): JSX.Element {
  const [validDescription, setValidDescription] = useState(true)
  const [point, setPoint] = useState<Point>(
    {
      latitude: undefined,
      longitude: undefined
    }
  )
  const [description, setDescription] = useState('')
  const [popupOpen, setPopupOpen] = useState<boolean>(false)
  const [popupMessage, setPopupMessage] = useState<string>()
  const navigate = useNavigate()

  const validateForm = (): boolean => {
    if (description.length <= 0) {
      setValidDescription(false)
      setPopupMessage('Informe a descrição')
      setPopupOpen(true)
    }
    if (point.latitude === undefined || point.longitude === undefined) {
      setPopupMessage('Marque o ponto no mapa')
      setPopupOpen(true)
    }

    return point.latitude !== undefined &&
      point.longitude !== undefined &&
      description.length > 0
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDescription(event.target.value)
  }

  const handleSubmit = (): void => {
    if (validateForm()) {
      const requestData = {
        ...point,
        description
      }
      axios.post(BASE_URL + '/point/public/register', requestData)
        .then(response => { navigate('/', { state: { pointRegistered: true } }) })
        .catch(error => { console.log(error) })
    }
  }

  return (
    <>
      <ResponsiveDrawer selected='CADASTRAR PONTO'>
        <Grid container justifyContent='center'>
          <MapSelector onClick={setPoint}/>
          <Grid item xs={12} padding={2}>
            <MTextField
              xs={12}
              sm={12}
              label='Descreva o que é esse ponto de foco'
              name='description'
              type='text'
              autoFocus={false}
              onChange={handleChange}
              required={true}
              helperText=''
              error={!validDescription} />
            </Grid>
            <Grid item padding={2}>
              <Button
                onClick={handleSubmit}
                variant='contained'
                style={{ backgroundColor: '#0072F0' }}
                sx={{ padding: 2 }}
              >
                Relatar ponto
              </Button>
            </Grid>
        </Grid>
      </ResponsiveDrawer>
      <Popup open={popupOpen} color='#cc0000' message={popupMessage ?? ''} setPopupState={setPopupOpen} />
    </>
  )
}
