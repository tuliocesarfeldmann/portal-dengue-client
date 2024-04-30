import Home from './pages/Home'
import Login from './pages/Login'
import CadastrarPonto from './pages/CadastrarPonto'
import Informativos from './pages/Informativos'
import Estatisticas from './pages/Estatisticas'

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
    path: '/informativos',
    exact: true,
    Component: Informativos
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
  }
]

export default routes
