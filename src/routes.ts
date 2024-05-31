import Home from './pages/Home'
import Login from './pages/Login'
import CadastrarPonto from './pages/CadastrarPonto'
import Informatives from './pages/Informatives'
import Statistics from './pages/Statistics'
import RelatedPoints from './pages/ReportedPoints'
import About from './pages/About'
import RegisterInformative from './pages/RegisterInformative'
import RegisterUser from './pages/RegisterUser'

const routes = [
  {
    path: '/',
    exact: true,
    Component: Home
  },
  {
    path: '/cadastrarPonto',
    exact: true,
    Component: CadastrarPonto
  },
  {
    path: '/informatives',
    exact: true,
    Component: Informatives
  },
  {
    path: '/estatisticas',
    exact: true,
    Component: Statistics
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
  },
  {
    path: '/reported-points',
    exact: true,
    Component: RelatedPoints
  },
  {
    path: '/about',
    exact: true,
    Component: About
  },
  {
    path: '/register-informative',
    exact: true,
    Component: RegisterInformative
  },
  {
    path: '/register-user',
    exact: true,
    Component: RegisterUser
  }
]

export default routes
