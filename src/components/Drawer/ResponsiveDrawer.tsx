import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { colors } from 'src/Theme'

const drawerWidth = '240px'
const appbarHeight = '60px'

interface Props {
  selected?: string
  children?: any
}

export default function ResponsiveDrawer (props: Props): JSX.Element {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)

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
      <ListItemText primary={'LOGO'} primaryTypographyProps={{
        fontWeight: 700,
        fontSize: '1.2em'
      }} sx={{
        mt: '40px',
        mb: '40px'
      }}/>
      <List>
        {['HOME', 'CADASTRAR PONTO', 'INFORMATIVOS', 'ESTATÍSTICAS'].map((text, index) => (
          <ListItem key={text} disablePadding sx={{
            backgroundColor: props.selected === text ? colors.selectedBackground : colors.background,
            color: props.selected === text ? colors.selectedForeground : colors.foreground,
            borderRadius: '10px'
          }}>
            <ListItemButton>
              <ListItemText primary={text} primaryTypographyProps={{
                fontWeight: 700,
                fontSize: '1.2em'
              }} sx={{ textAlign: 'center', fontWeight: 'bold' }}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          display: { md: 'none' },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          height: appbarHeight,
          ml: { md: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
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
            display: { xs: 'block', md: 'none' },
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
            display: { xs: 'none', md: 'block' },
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
        sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar sx={{ display: { xs: 'block', md: 'none' } }}/>
        {props.children}
      </Box>
    </Box>
  )
}
