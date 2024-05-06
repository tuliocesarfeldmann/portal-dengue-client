import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { Divider, Grid, Paper } from '@mui/material'
import DrawerButton from './DrawerButton'

const drawerWidth = '240px'
const appbarHeight = '60px'

interface Props {
  selected?: string
  children?: any
}

export default function ResponsiveDrawer (props: Props): JSX.Element {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)
  const navigate = useNavigate()

  const handleDrawerClose = (): void => {
    setIsClosing(true)
    setMobileOpen(false)
  }

  const handleDrawerTransitionEnd = (): void => {
    setIsClosing(false)
  }

  const handleDrawerToggle = (): void => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen)
    }
  }

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box
        component="img"
        sx={{
          width: '30%',
          borderRadius: '20px',
          mt: '20px'
        }}
        alt="Portal da Dengue logo."
        src="/logo.png"
      />
      <ListItemText primary={ 'PORTAL DA DENGUE - TP' } primaryTypographyProps={{
        textAlign: 'center',
        fontWeight: 700,
        fontSize: '1.5em'
      }} sx={{ margin: '20px' }} />
      <Divider sx={{ color: '#000000', width: '100%', mb: '20px' }}/>
      <DrawerButton
        onClick={() => { navigate('/') }}
        selected={ props.selected === 'HOME' }>
        HOME
      </DrawerButton>
      <DrawerButton
        onClick={() => { navigate('/cadastrarPonto') }}
        selected={ props.selected === 'CADASTRAR PONTO' }>
        CADASTRAR PONTO
      </DrawerButton>
      <DrawerButton
        onClick={() => { navigate('/informativos') }}
        selected={ props.selected === 'INFORMATIVOS' }>
        INFORMATIVOS
      </DrawerButton>
      <DrawerButton
        onClick={() => { navigate('/estatisticas') }}
        selected={ props.selected === 'ESTATÍSTICAS' }>
        ESTATÍSTICAS
      </DrawerButton>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          display: { sm: 'none' },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: appbarHeight,
          ml: { sm: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Portal da Dengue - TP
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#008BDA',
              color: '#ffffff'
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#008BDA',
              color: '#ffffff'
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        padding={{ xs: 1, sm: 2 }}
        sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar sx={{ display: { xs: 'block', sm: 'none' } }} />
        <Grid container component={Paper} height={'100%'} xs={12} sm={10} md={8} xl={6} alignSelf={'center'}>
          {props.children}
        </Grid>
      </Box>
    </Box>
  )
}
