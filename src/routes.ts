import Home from './pages/Home'
import Login from './pages/Login'
import CadastrarPonto from './pages/CadastrarPonto'
import Informatives from './pages/Informatives'
import Estatisticas from './pages/Estatisticas'
import RelatedPoints from './pages/ReportedPoints'
import About from './pages/About'
import RegisterInformative from './pages/RegisterInformative'

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
    Component: Estatisticas
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
  }
]

export default routes
