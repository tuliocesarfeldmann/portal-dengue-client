// import { Grid } from '@mui/material'
import Heatmap from 'src/components/Maps/Heatmap'
import ResponsiveDrawer from '../components/Drawer/ResponsiveDrawer'

export default function Home (): JSX.Element {
  return (
    <>
      <ResponsiveDrawer selected='HOME'>
          <Heatmap />
      </ResponsiveDrawer>
    </>
  )
}
