import { Button, Grid } from '@mui/material'
import ResponsiveDrawer from '../components/Drawer/ResponsiveDrawer'
import MapSelector, { type Point } from 'src/components/MapSelector'
import MTextField from 'src/components/MTextField'
import { useState } from 'react'

export default function Home (): JSX.Element {
  const [validDescription, setValidDescription] = useState(true)
  const [point, setPoint] = useState<Point>(
    {
      lat: undefined,
      lng: undefined
    }
  )
  const [description, setDescription] = useState('')

  const validateForm = (): boolean => {
    return point.lat !== undefined &&
      point.lng !== undefined &&
      description.length > 0
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDescription(event.target.value)
  }

  const handleSubmit = (): void => {
    console.log(point)

    if (validateForm()) {
      console.log('teste')
      return
    }

    setValidDescription(false)
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
    </>
  )
}
