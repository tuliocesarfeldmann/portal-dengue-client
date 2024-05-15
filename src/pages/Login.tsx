import { Button, Grid } from '@mui/material'
import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from 'src/AuthContext'
import MGridForm from 'src/components/MGridForm'
import MTextField from 'src/components/MTextField'
import { BASE_URL } from 'src/util/util'

export default function Login (): JSX.Element {
  const { setEmail, setPassword } = useContext(AuthContext)
  const [validForm, setValidForm] = useState(true)
  const [state, setState] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  const validateForm = (): boolean => {
    return state.email.length > 0 && state.password.length > 0
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
    if (validateForm()) {
      axios.post(BASE_URL + '/public/user/login', state)
        .then(response => {
          setEmail(state.email)
          setPassword(state.password)
          navigate('/reported-points')
        })
        .catch(error => { console.log(error) })
      return
    }
    setValidForm(false)
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      <MGridForm title={'FAÇA O LOGIN'}>
        <Grid container item direction='row' justifyContent={'center'} >
          <MTextField
            xs={12}
            sm={12}
            label={'Email'}
            name={'email'}
            type={'email'}
            autoFocus={true}
            required={true}
            onChange={handleChange}
            error={!validForm}
            helperText={!validForm && state.email.length === 0 && 'Informe o email'}
          />
        </Grid>
        <Grid container item direction='row' justifyContent={'center'} >
          <MTextField
            xs={12}
            sm={12}
            label={'Password'}
            name={'password'}
            type={'password'}
            autoFocus={false}
            required={true}
            onChange={handleChange}
            error={!validForm}
            helperText={!validForm && state.password.length === 0 && 'Informe a senha'}
          />
        </Grid>
        <Grid container item direction='row' justifyContent={'center'} >
          <Button
            onClick={handleSubmit}
            variant='contained'
            style={{ backgroundColor: '#0072F0' }}
          >
            LOGIN
          </Button>
        </Grid>
      </MGridForm>
    </div>
  )
}
