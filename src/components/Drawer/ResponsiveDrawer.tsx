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
import HomeIcon from '@mui/icons-material/Home'
import GpsFixedIcon from '@mui/icons-material/GpsFixed'
import InfoIcon from '@mui/icons-material/Info'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import LoginIcon from '@mui/icons-material/Login'
import ListIcon from '@mui/icons-material/List'
import AddIcon from '@mui/icons-material/Add'
import HelpIcon from '@mui/icons-material/Help'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'

import { AuthContext } from 'src/AuthContext'

const drawerWidth = '270px'
const appbarHeight = '60px'

interface Props {
  selected?: string
  children?: any
}

export default function ResponsiveDrawer (props: Props): JSX.Element {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)
  const { isUserLogged, clearAuth } = React.useContext(AuthContext)
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
      <ListItemText primary={ 'TESTE BUILD AUTOMÁTICA' } primaryTypographyProps={{
        textAlign: 'center',
        fontWeight: 700,
        fontSize: '1.5em'
      }} sx={{ margin: '20px' }} />
      <Divider sx={{ color: '#000000', width: '100%', mb: '20px' }}/>
      <DrawerButton
        onClick={() => { navigate('/') }}
        selected={ props.selected === 'HOME' }>
        <HomeIcon />
        <div style={{ marginLeft: '10px' }}>HOME</div>
      </DrawerButton>
      <DrawerButton
        onClick={() => { navigate('/cadastrarPonto') }}
        selected={ props.selected === 'CADASTRAR PONTO' }>
        <GpsFixedIcon />
        <div style={{ marginLeft: '10px' }}>CADASTRAR PONTO</div>
      </DrawerButton>
      <DrawerButton
        onClick={() => { navigate('/informatives') }}
        selected={ props.selected === 'INFORMATIVOS' }>
        <InfoIcon />
        <div style={{ marginLeft: '10px' }}>INFORMATIVOS</div>
      </DrawerButton>
      <DrawerButton
        onClick={() => { navigate('/estatisticas') }}
        selected={ props.selected === 'ESTATÍSTICAS' }>
        <ShowChartIcon />
        <div style={{ marginLeft: '10px' }}>ESTATÍSTICAS</div>
      </DrawerButton>
      {!isUserLogged() && <DrawerButton
        onClick={() => { navigate('/login') }}
        selected={ props.selected === 'LOGIN' }>
        <LoginIcon />
        <div style={{ marginLeft: '10px' }}>LOGIN</div>
      </DrawerButton>}
      {isUserLogged() && <DrawerButton
        onClick={() => { navigate('/reported-points') }}
        selected={ props.selected === 'PONTOS RELATADOS' }>
        <ListIcon />
        <div style={{ marginLeft: '10px', textAlign: 'left' }}>PONTOS RELATADOS</div>
      </DrawerButton>}
      {isUserLogged() && <DrawerButton
        onClick={() => { navigate('/register-informative') }}
        selected={ props.selected === 'CADASTRAR INFORMATIVO' }>
        <AddIcon />
        <div style={{ marginLeft: '10px', textAlign: 'left' }}>CADASTRAR INFORMATIVOS</div>
      </DrawerButton>}
      {isUserLogged() && <DrawerButton
        onClick={() => { navigate('/register-user') }}
        selected={ props.selected === 'CADASTRAR USUÁRIO' }>
        <PersonAddIcon />
        <div style={{ marginLeft: '10px', textAlign: 'left' }}>CADASTRAR USUÁRIO</div>
      </DrawerButton>}
      {isUserLogged() && <DrawerButton
        onClick={() => { navigate('/users') }}
        selected={ props.selected === 'USUÁRIOS' }>
        <PeopleAltIcon />
        <div style={{ marginLeft: '10px', textAlign: 'left' }}>USUÁRIOS</div>
      </DrawerButton>}
      <DrawerButton
        onClick={() => { navigate('/about') }}
        selected={ props.selected === 'SOBRE' }>
        <HelpIcon />
        <div style={{ marginLeft: '10px' }}>SOBRE</div>
      </DrawerButton>
      {isUserLogged() && <DrawerButton
        onClick={() => {
          clearAuth()
          navigate('/')
        }}
        selected={ false }>
        <LoginIcon />
        <div style={{ marginLeft: '10px', textAlign: 'left' }}>LOGOUT</div>
      </DrawerButton>}
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
        <Box display={'flex'} justifyContent={'center'}>
          <Box width={'100%'} display={'flex'} justifyContent={'center'} maxWidth={'2000px'}>
            <Grid
              container
              item
              component={Paper}
              minHeight={'95vh'}
              justifyContent={'center'}
              alignSelf={'center'}
              width={'100%'}
            >
              {props.children}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
