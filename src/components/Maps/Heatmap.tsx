import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { type HeatLatLngTuple, heatLayer } from 'leaflet'
import 'leaflet.heat'

import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'

import axios from 'axios'
import { BASE_URL } from 'src/util/util'

export default function Heatmap (): JSX.Element {
  function HeatmapLayer (): JSX.Element {
    const map = useMap()
    const [heatPoints, setHeatPoints] = useState<HeatLatLngTuple[]>()

    useEffect(() => {
      axios.get(BASE_URL + '/point/public/list')
        .then(response => {
          setHeatPoints(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }, [])

    useEffect(() => {
      if (heatPoints !== undefined) {
        heatLayer(heatPoints, { radius: 80, blur: 50 }).addTo(map)
        map.invalidateSize()
      }
    }, [heatPoints])

    return (
      <>
      </>
    )
  }

  return (
    <Grid container justifyContent={'center'} padding={{ xs: 1, sm: 2 }}>
      <Grid item xs={12} sx={{ height: { xs: '60vh', sm: '70vh' }, borderRadius: '20px', overflow: 'hidden' }} >
        <MapContainer
          center={[-27.456551, -53.9300297]}
          zoom={17}
          bounceAtZoomLimits={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer detectRetina={false}
            attribution='Google Maps'
            url='https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}'
          />
          <HeatmapLayer />
        </MapContainer>
      </Grid>
    </Grid>
  )
}
