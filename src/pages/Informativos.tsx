import ResponsiveDrawer from '../components/Drawer/ResponsiveDrawer'
import MapSelector from 'src/components/MapSelector'

export default function Home (): JSX.Element {
  return (
    <>
      <ResponsiveDrawer selected='INFORMATIVOS'>
        <MapSelector/>
      </ResponsiveDrawer>
    </>
  )
}
