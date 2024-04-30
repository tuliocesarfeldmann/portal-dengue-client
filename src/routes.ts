import Home from './pages/Home'
import Login from './pages/Login'

const routes = [
  {
    path: '/',
    exact: true,
    Component: Home
  },
  {
    path: '/cadastro',
    exact: true,
    Component: Home
  },
  {
    path: '/dashboard',
    exact: true,
    Component: Home
  },
  {
    path: '/login',
    exact: true,
    Component: Login
  }
]

export default routes
