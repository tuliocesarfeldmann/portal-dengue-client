import { MapContainer, Marker, TileLayer, useMapEvent } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { type LatLng, Icon } from 'leaflet'
import { useState } from 'react'

import markerIconPng from 'leaflet/dist/images/marker-icon.png'
import { Box } from '@mui/material'

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
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: { xs: 2, md: 4 } } }>
      <Box sx={{ display: 'flex', height: '800px', maxHeight: '70vh', width: '100%', maxWidth: '1000px' }}>
        <MapContainer center={[-27.456551, -53.9300297]} zoom={17} style={{ height: '100%', width: '100%', borderRadius: '30px' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <SelectPositionMarker />
        </MapContainer>
      </Box>
      <div>Latitude e Longitude do marcador: {clickPosition?.lat}, {clickPosition?.lng}</div>
    </Box>
  )
}
