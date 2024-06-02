import { Button, Grid } from '@mui/material'
import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from 'src/AuthContext'
import MGridForm from 'src/components/MGridForm'
import MTextField from 'src/components/MTextField'
import Popup from 'src/components/Popup'
import { BASE_URL } from 'src/util/util'

export default function Login (): JSX.Element {
  const { setEmail, setPassword } = useContext(AuthContext)
  const [validForm, setValidForm] = useState(true)
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  })
  const [popupOpen, setPopupOpen] = useState<boolean>(false)
  const [popupMessage, setPopupMessage] = useState<string>()

  const navigate = useNavigate()

  const validateForm = (): boolean => {
    return formState.email.length > 0 && formState.password.length > 0
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormState(prevState => {
      return {
        ...prevState,
        [event.target.name]: event.target.value
      }
    })
  }

  const handleSubmit = (): void => {
    if (validateForm()) {
      axios.post(BASE_URL + '/user/public/login', formState)
        .then(_ => {
          setEmail(formState.email)
          setPassword(formState.password)
          localStorage.setItem('email', formState.email)
          localStorage.setItem('password', formState.password)
          navigate('/reported-points')
        })
        .catch(error => {
          setPopupMessage('Dados incorretos')
          setPopupOpen(true)
          console.log(error)
        })
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
      <MGridForm title={'FAÇA O LOGIN'} height={'75vh'} width={'40vw'} border={'2px solid #0072F0'}>
        <Grid container direction='row'>
          <MTextField
            xs={12}
            sm={12}
            label={'Email'}
            name={'email'}
            type={'email'}
            margin={'dense'}
            autoFocus={true}
            required={true}
            onChange={handleChange}
            error={!validForm}
            helperText={!validForm && formState.email.length === 0 && 'Informe o email'}
          />
        </Grid>
        <Grid container direction='row'>
          <MTextField
            xs={12}
            sm={12}
            label={'Password'}
            name={'password'}
            type={'password'}
            margin={'dense'}
            autoFocus={false}
            required={true}
            onChange={handleChange}
            error={!validForm}
            helperText={!validForm && formState.password.length === 0 && 'Informe a senha'}
          />
        </Grid>
        <Grid container direction='row' margin={'8px 0px 0px 0px'}>
          <Button
            onClick={handleSubmit}
            variant='contained'
            fullWidth={true}
            style={{ backgroundColor: '#0072F0' }}
          >
            LOGIN
          </Button>
        </Grid>
      </MGridForm>
      <Popup open={popupOpen} color='#cc0000' message={popupMessage ?? ''} setPopupState={setPopupOpen} />
    </div>
  )
}
