// import { Grid } from '@mui/material'
import Heatmap from 'src/components/Maps/Heatmap'
import ResponsiveDrawer from '../components/Drawer/ResponsiveDrawer'
import Popup from 'src/components/Popup'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function Home (): JSX.Element {
  const [popupOpen, setPopupOpen] = useState<boolean>(false)
  const [popupMessage, setPopupMessage] = useState<string>()
  const { state } = useLocation()

  useEffect(() => {
    if (state?.pointRegistered === true) {
      setPopupMessage('Salvo com sucesso')
      setPopupOpen(true)
    }
  }, [])

  return (
    <>
      <ResponsiveDrawer selected='HOME'>
          <Heatmap />
      </ResponsiveDrawer>
      <Popup open={popupOpen} color='#33cc33' message={popupMessage ?? ''} setPopupState={setPopupOpen} />
    </>
  )
}
