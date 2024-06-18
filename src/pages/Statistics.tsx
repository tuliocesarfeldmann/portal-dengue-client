import React, { useEffect, useState } from 'react'
import ResponsiveDrawer from '../components/Drawer/ResponsiveDrawer'
import axios from 'axios'
import { BarChart } from '@mui/x-charts/BarChart'
import { PieChart } from '@mui/x-charts/PieChart'
import { BASE_URL } from 'src/util/util'
import { Grid, Typography } from '@mui/material'

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

  useEffect(() => {
    axios.get(BASE_URL + '/point/public/daily-count')
      .then(response => {
        setDailyCount(response.data)
      })
      .catch(error => {
        console.error(error)
      })
    axios.get(BASE_URL + '/point/public/neighborhood-count')
      .then(response => {
        setNeighborhoodCount(response.data)
      })
      .catch(error => {
        console.error(error)
      })
    axios.get(BASE_URL + '/point/public/status-count')
      .then(response => {
        setStatusCount(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

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

  return (
    <ResponsiveDrawer selected='ESTATÍSTICAS'>
      <Grid container style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px'
      }}>
        <Typography variant='h4'>Estatísticas Gerais</Typography>
        <hr style={{ width: '100%', margin: '20px 0' }} />
        <Typography variant='h6' style={{ alignSelf: 'flex-start' }}>- Relatos nos últimos 30 dias:</Typography>
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
