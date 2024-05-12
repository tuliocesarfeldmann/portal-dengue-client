// import { Grid } from '@mui/material'
import ResponsiveDrawer from '../components/Drawer/ResponsiveDrawer'
import MapSelector from 'src/components/Maps/MapSelector'

export default function Home (): JSX.Element {
  return (
    <>
      <ResponsiveDrawer selected='HOME'>
          <MapSelector/>
      </ResponsiveDrawer>
    </>
  )
}
