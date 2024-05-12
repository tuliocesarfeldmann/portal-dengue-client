import 'leaflet/dist/leaflet.css'

import { Grid } from '@mui/material'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import markerIconPng from 'leaflet/dist/images/marker-icon.png'
import { Icon } from 'leaflet'

interface MiniMapViewerProps {
  lat: number
  lng: number
}

export default function MiniMapViewer ({ lat, lng }: MiniMapViewerProps): JSX.Element {
  return (
    <Grid container justifyContent={'center'} >
        <Grid item xs={12} sx={{ height: { xs: '200px' }, borderRadius: '5px', overflow: 'hidden' }} >
          <MapContainer
            center={[lat, lng]}
            zoom={17}
            zoomControl={false}
            doubleClickZoom={false}
            scrollWheelZoom={false}
            maxZoom={17}
            minZoom={17}
            dragging={false}
            keyboard={false}
            bounceAtZoomLimits={false}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer detectRetina={false}
              attribution='Google Maps'
              url='https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}'
            />
            <Marker position={{ lat, lng }} icon={ new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] }) }>
            </Marker>
          </MapContainer>
        </Grid>
      </Grid>
  )
}
