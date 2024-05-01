import { MapContainer, Marker, TileLayer, useMapEvent } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { type LatLng, Icon } from 'leaflet'
import { useState } from 'react'

import markerIconPng from 'leaflet/dist/images/marker-icon.png'
import { Grid } from '@mui/material'

export default function MapSelector (): JSX.Element {
  const [clickPosition, setClickPosition] = useState<LatLng | undefined>(undefined)

  function SelectPositionMarker (): JSX.Element {
    useMapEvent('click', (event) => {
      setClickPosition(event.latlng)
    })
    return (
      <>
      { clickPosition !== undefined &&
        <Marker position={clickPosition} icon={ new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] }) }>
        </Marker>
      }
      </>
    )
  }

  return (
    // <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: { xs: 2, md: 4 } } }>
    // <Grid container xs={12}>
    //   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '800px', maxHeight: '70vh', width: '100%', maxWidth: '1000px', margin: { xs: 2, md: 4 } }}>
    //     <MapContainer center={[-27.456551, -53.9300297]} zoom={17} style={{ height: '100%', width: '100%', borderRadius: '30px' }}>
    //       <TileLayer
    //         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //         url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    //       />
    //       <SelectPositionMarker />
    //     </MapContainer>
    //   </Box>
    // </Grid>
    <Grid container xs={12} justifyContent={'center'} padding={2}>
      <Grid item xs={12} sm={10} md={8} xl={6} sx={{ height: '70vh', borderRadius: '30px', overflow: 'hidden' }} >
        <MapContainer center={[-27.456551, -53.9300297]} zoom={17} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <SelectPositionMarker />
        </MapContainer>
      </Grid>
    </Grid>
  )
}
