import { useContext, useEffect, useState } from 'react'
import ResponsiveDrawer from '../components/Drawer/ResponsiveDrawer'
import axios from 'axios'
import { BASE_URL } from 'src/util'
import { AuthContext } from 'src/AuthContext'
import { useNavigate } from 'react-router-dom'
import ReportedPoint from 'src/components/ReportedPoint'
import { Grid, Typography } from '@mui/material'

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
  const { email, password } = useContext(AuthContext)
  const [pointList, setPointList] = useState<PointInformation[]>()
  const navigate = useNavigate()

  useEffect(() => {
    if (email !== undefined && password !== undefined) {
      axios.get(BASE_URL + '/point/list', {
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
  }, [])

  return (
    <>
      <ResponsiveDrawer selected='PONTOS RELATADOS'>
        <Typography fontSize={24} textAlign={'center'} fontWeight={700} width={'100%'} margin={4}>
          PONTOS RELATADOS
        </Typography>
        <Grid container display={'flex'}>
          {pointList?.map((point) => {
            return (
              <ReportedPoint
                key={point.id}
                lat={point.latitude}
                lng={point.longitude}
                description={point.description}
              />
            )
          })}
        </Grid>
      </ResponsiveDrawer>
    </>
  )
}
