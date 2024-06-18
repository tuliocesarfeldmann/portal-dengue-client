import { useContext, useEffect, useState } from 'react'
import ResponsiveDrawer from '../components/Drawer/ResponsiveDrawer'
import axios from 'axios'
import { BASE_URL } from 'src/util/util'
import { AuthContext } from 'src/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import ReportedPoint from 'src/components/ReportedPoint'
import { Box, Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import Popup from 'src/components/Popup'

interface PointInformation {
  id: number
  latitude: number
  longitude: number
  description: string
  creationDate: string
  pointSituation: {
    id: number
    description: string
  }
}

export default function ReportedPoints (): JSX.Element {
  const { email, password, isUserLogged } = useContext(AuthContext)
  const [pointList, setPointList] = useState<PointInformation[]>([])
  const [popupOpen, setPopupOpen] = useState<boolean>(false)
  const [popupMessage, setPopupMessage] = useState<string>()
  const [toggle, setToggle] = useState<string>('Pontos para aceitar')
  const { state } = useLocation()
  const navigate = useNavigate()

  const handleToggle = (
    event: React.MouseEvent<HTMLElement>,
    newOption: string
  ): void => {
    if (newOption !== null) {
      setToggle(newOption)
    }
  }

  useEffect(() => {
    if (!isUserLogged()) {
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    const endpoint = toggle === 'Pontos para aceitar' ? '/point/list' : '/point/listPointsToFix'
    if (email !== undefined && password !== undefined) {
      axios.get(BASE_URL + endpoint, {
        auth: {
          username: email,
          password
        }
      })
        .then(response => {
          setPointList(response.data)
        })
        .catch(error => {
          console.log(error)
          // navigate('/login')
        })
    } else {
      navigate('/login')
    }
  }, [toggle])

  useEffect(() => {
    if (state?.userRegistered === true) {
      setPopupMessage('Salvo com sucesso')
      setPopupOpen(true)
    }
  }, [])

  return (
    <>
      {isUserLogged() && <>
        <ResponsiveDrawer selected='PONTOS RELATADOS'>
          <Box display={'flex'} flexDirection={'column'} justifySelf={'center'} width={'100%'} alignContent={'center'}>
            <Typography fontSize={24} height={24} textAlign={'center'} fontWeight={700} margin={4}>
              PONTOS RELATADOS
            </Typography>
            <ToggleButtonGroup
              value={toggle}
              exclusive
              onChange={handleToggle}
              sx={{
                justifySelf: 'center',
                alignSelf: 'center'
              }}
            >
              <ToggleButton
                sx={{
                  '&.Mui-selected, &.Mui-selected:hover': {
                    bgcolor: '#008BDA',
                    fontWeight: 'bold',
                    color: 'white'
                  }
                }}
                value='Pontos para aceitar'
              >
                Pontos para aceitar
              </ToggleButton>
              <ToggleButton
                sx={{
                  '&.Mui-selected, &.Mui-selected:hover': {
                    bgcolor: '#008BDA',
                    fontWeight: 'bold',
                    color: 'white'
                  }
                }}
                value='Pontos para corrigir'
              >
                Pontos para corrigir
              </ToggleButton>
            </ToggleButtonGroup>
            <Grid container display={'flex'} alignItems={'start'}>
              {pointList.length > 0
                ? pointList?.map((point) => {
                  console.log(point)
                  return (
                    <ReportedPoint
                      key={point.id}
                      id={point.id}
                      lat={point.latitude}
                      lng={point.longitude}
                      description={point.description}
                      status={point.pointSituation.id}
                    />
                  )
                })
                : <div style={{ width: '100%', textAlign: 'center' }}>Nenhum Ponto Relatado</div>}
            </Grid>
          </Box>
        </ResponsiveDrawer>
        <Popup open={popupOpen} color='#33cc33' message={popupMessage ?? ''} setPopupState={setPopupOpen} />
      </>}
    </>
  )
}
