import { Button, Grid } from '@mui/material'
import axios from 'axios'
import { useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from 'src/AuthContext'
import ResponsiveDrawer from 'src/components/Drawer/ResponsiveDrawer'
import MGridForm from 'src/components/MGridForm'
import MTextField from 'src/components/MTextField'
import { BASE_URL } from 'src/util/util'

export default function RegisterUser (): JSX.Element {
  const { email, password, isUserLogged } = useContext(AuthContext)
  const [validForm, setValidForm] = useState(true)
  const [state, setState] = useState({
    cpf: '',
    name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  useMemo(() => {
    if (!isUserLogged()) {
      navigate('/login')
    }
  }, [])

  const validateForm = (): boolean => {
    return state.cpf.length > 0 &&
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
          navigate('/reported-points')
        })
        .catch(error => { console.log(error) })
      return
    }
    setValidForm(false)
  }

  return (
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
              error={!validForm}
              helperText={!validForm && state.cpf.length === 0 && 'Informe o CPF'}
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
              error={!validForm}
              helperText={!validForm && state.name.length === 0 && 'Informe o nome'}
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
              error={!validForm}
              helperText={!validForm && state.email.length === 0 && 'Informe o email'}
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
              error={!validForm}
              helperText={!validForm && state.email.length === 0 && 'Informe a senha'}
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
  )
}
