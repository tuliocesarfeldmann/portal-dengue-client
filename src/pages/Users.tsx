import ResponsiveDrawer from '../components/Drawer/ResponsiveDrawer'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { BASE_URL } from 'src/util/util'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Switch, Paper, Typography } from '@mui/material'
import { AuthContext } from 'src/AuthContext'
import { useNavigate } from 'react-router-dom'
import Popup from 'src/components/Popup'

interface User {
  id: number
  cpf: string
  name: string
  email: string
  active: boolean
}

export default function Users (): JSX.Element {
  const [users, setUsers] = useState<User[]>([])
  const { email, password, isUserLogged } = useContext(AuthContext)

  const [popupOpen, setPopupOpen] = useState<boolean>(false)
  const [popupMessage, setPopupMessage] = useState<string>()

  const navigate = useNavigate()

  useEffect(() => {
    if (!isUserLogged()) {
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    if (email !== undefined && password !== undefined) {
      axios.get(BASE_URL + '/user/list', {
        auth: {
          username: email,
          password
        }
      })
        .then(response => {
          setUsers(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      navigate('/login')
    }
  }, [])

  const updateUserStatus = (id: number, isActive: boolean): void => {
    if (email !== undefined && password !== undefined) {
      axios.put(BASE_URL + `/user/update/${id}`, { active: isActive }, {
        auth: {
          username: email,
          password
        }
      })
        .then(_ => {
          setPopupOpen(true)
          setPopupMessage('Atualizado com sucesso!')
          setUsers(users.map(user =>
            user.id === id ? { ...user, active: isActive } : user
          ))
        })
        .catch(error => {
          console.error('Error updating user status:', error)
        })
    } else {
      navigate('/login')
    }
  }

  const handleToggleChange = (id: number, currentStatus: boolean): void => {
    updateUserStatus(id, !currentStatus)
  }

  return (
    <>
      <ResponsiveDrawer selected='USUÁRIOS'>
        <Grid style={{ width: '100%' }}>
          <Typography fontWeight={700} marginBottom={2} textAlign={'center'}>
            Usuários Cadastrados
          </Typography>
          {users.length > 0
            ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>CPF</TableCell>
                      <TableCell>Nome</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Ativo</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.cpf}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Switch
                            checked={user.active}
                            onChange={() => { handleToggleChange(user.id, user.active) }}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              ) : (
                <>Nenhum usuário</>
              )}
        </Grid>
      </ResponsiveDrawer>
      <Popup open={popupOpen} color='#33cc33' message={popupMessage ?? ''} setPopupState={setPopupOpen} />
    </>
  )
}
