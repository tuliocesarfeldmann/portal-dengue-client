import React, { useEffect, useState } from 'react'
import ResponsiveDrawer from '../components/Drawer/ResponsiveDrawer'
import axios from 'axios'
import { BarChart } from '@mui/x-charts/BarChart'
import { PieChart } from '@mui/x-charts/PieChart'
import { BASE_URL } from 'src/util/util'
import { Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'

interface DailyCount {
  date: string
  count: number
}

interface NeighborhoodCount {
  neighborhood: string
  count: number
}

interface StatusCount {
  status: string
  count: number
}

export default function Statistics (): JSX.Element {
  const [dailyCount, setDailyCount] = useState<DailyCount[]>([])
  const [neighborhoodCount, setNeighborhoodCount] = useState<NeighborhoodCount[]>([])
  const [statusCount, setStatusCount] = useState<StatusCount[]>([])
  const [toggleStatus, setToggleStatus] = useState<number>(3)
  const [toggleDays, setToggleDays] = useState<number>(30)

  useEffect(() => {
    axios.get(BASE_URL + '/point/public/daily-count',
      {
        params: {
          days: toggleDays,
          statusId: toggleStatus
        }
      }
    )
      .then(response => {
        const count: DailyCount[] = response.data
        count.sort((a, b) => {
          const datePartsA = a.date.split('/')
          const datePartsB = b.date.split('/')
          return new Date(+datePartsA[2], +datePartsA[1] - 1, +datePartsA[0]).getTime() - new Date(+datePartsB[2], +datePartsB[1] - 1, +datePartsB[0]).getTime()
        })
        setDailyCount(count)
      })
      .catch(error => {
        console.error(error)
      })
    axios.get(BASE_URL + '/point/public/neighborhood-count',
      {
        params: {
          days: toggleDays,
          statusId: toggleStatus
        }
      }
    )
      .then(response => {
        setNeighborhoodCount(response.data)
      })
      .catch(error => {
        console.error(error)
      })
    axios.get(BASE_URL + '/point/public/status-count',
      {
        params: {
          days: toggleDays
        }
      }
    )
      .then(response => {
        setStatusCount(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [toggleDays, toggleStatus])

  const chartData = {
    labels: dailyCount.map(item => item.date),
    datasets: [
      {
        label: 'Quantidade de Pontos',
        data: dailyCount.map(item => item.count)
      }
    ]
  }

  const pieChartData = neighborhoodCount.map((item, index) => ({
    id: index,
    value: item.count,
    label: item.neighborhood
  }))

  const pieChartStatusData = statusCount.map((item, index) => ({
    id: index,
    value: item.count,
    label: item.status
  }))

  const handleToggleStatus = (
    event: React.MouseEvent<HTMLElement>,
    newOption: number
  ): void => {
    if (newOption !== null) {
      setToggleStatus(newOption)
    }
  }

  const handleToggleDays = (
    event: React.MouseEvent<HTMLElement>,
    newOption: number
  ): void => {
    if (newOption !== null) {
      setToggleDays(newOption)
    }
  }

  return (
    <ResponsiveDrawer selected='ESTATÍSTICAS'>
      <Grid container style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px'
      }}>
        <Typography variant='h4'>Estatísticas Gerais</Typography>
        <Typography variant='h5' padding={2}>Filtros:</Typography>
        <Grid container justifyContent={'center'}>
          <Grid item display={'flex'} justifyContent={'center'} padding={2} xs={12} md={6}>
            <ToggleButtonGroup
              value={toggleStatus}
              exclusive
              onChange={handleToggleStatus}
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
                value={3}
              >
                Pontos ativos
              </ToggleButton>
              <ToggleButton
                sx={{
                  '&.Mui-selected, &.Mui-selected:hover': {
                    bgcolor: '#008BDA',
                    fontWeight: 'bold',
                    color: 'white'
                  }
                }}
                value={4}
              >
                Pontos corrigidos
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item display={'flex'} justifyContent={'center'} padding={2} xs={12} md={6}>
            <ToggleButtonGroup
              value={toggleDays}
              exclusive
              onChange={handleToggleDays}
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
                value={30}
              >
                30 dias
              </ToggleButton>
              <ToggleButton
                sx={{
                  '&.Mui-selected, &.Mui-selected:hover': {
                    bgcolor: '#008BDA',
                    fontWeight: 'bold',
                    color: 'white'
                  }
                }}
                value={90}
              >
                90 dias
              </ToggleButton>
              <ToggleButton
                sx={{
                  '&.Mui-selected, &.Mui-selected:hover': {
                    bgcolor: '#008BDA',
                    fontWeight: 'bold',
                    color: 'white'
                  }
                }}
                value={180}
              >
                180 dias
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        <hr style={{ width: '100%', margin: '20px 0' }} />
        <Typography variant='h6' style={{ alignSelf: 'flex-start' }}>- Quantidade de relatos:</Typography>
        <div style={{ padding: '20px' }}>
          <BarChart
            width={500}
            height={300}
            xAxis={[{ scaleType: 'band', data: chartData.labels }]}
            series={[{ data: chartData.datasets[0].data, label: chartData.datasets[0].label }]}
          />
        </div>
        <hr style={{ width: '100%', margin: '20px 0' }} />
        <Typography variant='h6' style={{ alignSelf: 'flex-start' }}>- Quantidade por bairro:</Typography>
        <div style={{ padding: '20px' }}>
          <PieChart
            margin={{ right: 250 }}
            series={[
              {
                data: pieChartData,
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 2,
                cornerRadius: 5
              }
            ]}
            width={500}
            height={360}
            slotProps={{
              legend: {
                direction: 'column',
                position: { vertical: 'top', horizontal: 'right' },
                padding: 0
              }
            }}
          />
        </div>
        <hr style={{ width: '100%', margin: '20px 0' }} />
        <Typography variant='h6' style={{ alignSelf: 'flex-start' }}>- Quantidade total por Status:</Typography>
        <div style={{ padding: '20px' }}>
          <PieChart
            margin={{ right: 250 }}
            series={[
              {
                data: pieChartStatusData,
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 2,
                cornerRadius: 5
              }
            ]}
            width={500}
            height={360}
            slotProps={{
              legend: {
                direction: 'column',
                position: { vertical: 'top', horizontal: 'right' },
                padding: 0
              }
            }}
          />
        </div>
      </Grid>
    </ResponsiveDrawer>
  )
}
