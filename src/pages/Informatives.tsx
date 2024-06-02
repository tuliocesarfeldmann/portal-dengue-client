import ResponsiveDrawer from '../components/Drawer/ResponsiveDrawer'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { BASE_URL } from 'src/util/util'
import Informative from 'src/components/Informative'
import { Grid } from '@mui/material'
import { useLocation } from 'react-router-dom'
import Popup from 'src/components/Popup'

interface Info {
  id: number
  title: string
  description: string
  imagePath: string
}

export default function Informatives (): JSX.Element {
  const [informatives, setInformatives] = useState<Info[]>([])
  const [popupOpen, setPopupOpen] = useState<boolean>(false)
  const [popupMessage, setPopupMessage] = useState<string>()
  const { state } = useLocation()

  useEffect(() => {
    axios.get(BASE_URL + '/informative/public/list')
      .then(response => {
        setInformatives(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    if (state?.informativeRegistered === true) {
      setPopupMessage('Salvo com sucesso')
      setPopupOpen(true)
    }
  }, [])

  return (
    <>
      <ResponsiveDrawer selected='INFORMATIVOS'>
        <Grid style={{ width: '100%' }}>
          {informatives.map((info) => {
            return (
              <Informative
                key={info.id}
                title={info.title}
                description={info.description}
              />
            )
          })}
        </Grid>
      </ResponsiveDrawer>
      <Popup open={popupOpen} color='#33cc33' message={popupMessage ?? ''} setPopupState={setPopupOpen} />
    </>
  )
}
