import { Button, Grid } from '@mui/material'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from 'src/AuthContext'
import ResponsiveDrawer from 'src/components/Drawer/ResponsiveDrawer'
import MGridForm from 'src/components/MGridForm'
import MTextField from 'src/components/MTextField'
import Popup from 'src/components/Popup'
import { BASE_URL } from 'src/util/util'

export default function RegisterUser (): JSX.Element {
  const { email, password, isUserLogged } = useContext(AuthContext)
  const [validCpf, setValidCpf] = useState(true)
  const [validName, setValidName] = useState(true)
  const [validEmail, setValidEmail] = useState(true)
  const [validPassword, setValidPassword] = useState(true)
  const [state, setState] = useState({
    cpf: '',
    name: '',
    email: '',
    password: ''
  })
  const [popupOpen, setPopupOpen] = useState<boolean>(false)
  const [popupMessage, setPopupMessage] = useState<string>()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isUserLogged()) {
      navigate('/login')
    }
  }, [])

  const validateForm = (): boolean => {
    if (state.cpf.length <= 0) {
      setValidCpf(false)
      setPopupMessage('Informe o CPF')
      setPopupOpen(true)
    }
    if (state.cpf.length > 0 && state.cpf.length !== 11) {
      setValidCpf(false)
      setPopupMessage('O CPF precisa conter 11 dígitos')
      setPopupOpen(true)
    }
    if (state.name.length <= 0) {
      setValidName(false)
      setPopupMessage('Informe o nome')
      setPopupOpen(true)
    }
    if (state.email.length <= 0) {
      setValidEmail(false)
      setPopupMessage('Informe o email')
      setPopupOpen(true)
    }
    if (state.password.length <= 0) {
      setValidPassword(false)
      setPopupMessage('Informe a senha')
      setPopupOpen(true)
    }

    return state.cpf.length === 11 &&
      state.name.length > 0 &&
      state.email.length > 0 &&
      state.password.length > 0
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState(prevState => {
      return {
        ...prevState,
        [event.target.name]: event.target.value
      }
    })
  }

  const handleSubmit = (): void => {
    if (email === undefined || password === undefined) return

    if (validateForm()) {
      axios.post(BASE_URL + '/user/register',
        state, {
          auth: {
            username: email,
            password
          }
        })
        .then(_ => {
          navigate('/reported-points', { state: { userRegistered: true } })
        })
        .catch(error => { console.log(error) })
    }
  }

  return (
    <>
      {isUserLogged() && <>
        <ResponsiveDrawer selected='CADASTRAR USUÁRIO'>
          <Grid container justifyContent='center'>
            <MGridForm title={'CADASTRAR USUÁRIO'}>
              <Grid container direction='row' spacing={2}>
                <MTextField
                  xs={12}
                  sm={6}
                  label={'CPF'}
                  name={'cpf'}
                  type={'text'}
                  value={state.cpf}
                  margin={'dense'}
                  autoFocus={true}
                  required={true}
                  onChange={handleChange}
                  error={!validCpf}
                  helperText={!validCpf && state.cpf.length === 0 && 'Informe o CPF'}
                />
                <MTextField
                  xs={12}
                  sm={6}
                  label={'Nome'}
                  name={'name'}
                  type={'text'}
                  margin={'dense'}
                  autoFocus={false}
                  required={true}
                  onChange={handleChange}
                  error={!validName}
                  helperText={!validName && state.name.length === 0 && 'Informe o nome'}
                />
              </Grid>
              <Grid container direction='row' spacing={2}>
                <MTextField
                  xs={12}
                  sm={6}
                  label={'Email'}
                  name={'email'}
                  type={'email'}
                  margin={'dense'}
                  autoFocus={false}
                  required={true}
                  onChange={handleChange}
                  error={!validEmail}
                  helperText={!validEmail && state.email.length === 0 && 'Informe o email'}
                />
                <MTextField
                  xs={12}
                  sm={6}
                  label={'Senha'}
                  name={'password'}
                  type={'password'}
                  margin={'dense'}
                  autoFocus={false}
                  required={true}
                  onChange={handleChange}
                  error={!validPassword}
                  helperText={!validPassword && state.email.length === 0 && 'Informe a senha'}
                />
              </Grid>
              <Grid direction='row'>
                <Button
                  onClick={handleSubmit}
                  variant='contained'
                  style={{
                    backgroundColor: '#0072F0',
                    marginTop: '15px'
                  }}
                >
                  CADASTRAR
                </Button>
              </Grid>
            </MGridForm>
          </Grid>
        </ResponsiveDrawer>
        <Popup open={popupOpen} color='#cc0000' message={popupMessage ?? ''} setPopupState={setPopupOpen} />
      </>}
    </>
  )
}
