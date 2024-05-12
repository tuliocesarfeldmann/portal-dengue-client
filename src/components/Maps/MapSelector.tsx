import { MapContainer, Marker, TileLayer, useMapEvent } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { type LatLng, Icon } from 'leaflet'
import { type Dispatch, type SetStateAction, useState } from 'react'

import markerIconPng from 'leaflet/dist/images/marker-icon.png'
import { Grid } from '@mui/material'

interface MapSelectorProps {
  onClick?: Dispatch<SetStateAction<Point>>
}

export interface Point {
  latitude: number | undefined
  longitude: number | undefined
}

export default function MapSelector (props: MapSelectorProps): JSX.Element {
  const [clickPosition, setClickPosition] = useState<LatLng | undefined>(undefined)

  function SelectPositionMarker (): JSX.Element {
    useMapEvent('click', (event) => {
      if (props.onClick !== undefined) {
        props.onClick({ latitude: event.latlng.lat, longitude: event.latlng.lng })
      }
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
          <SelectPositionMarker />
        </MapContainer>
      </Grid>
    </Grid>
  )
}
