import { Grid } from '@mui/material'
import ResponsiveDrawer from '../components/Drawer/ResponsiveDrawer'
import MapSelector from 'src/components/MapSelector'

export default function Home (): JSX.Element {
  return (
    <>
      <ResponsiveDrawer selected='HOME'>
        <Grid container item>
          <MapSelector/>
        </Grid>
      </ResponsiveDrawer>
    </>
  )
}
