import { Button, Grid } from '@mui/material'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from 'src/AuthContext'
import ResponsiveDrawer from 'src/components/Drawer/ResponsiveDrawer'
import MGridForm from 'src/components/MGridForm'
import MTextField from 'src/components/MTextField'
import { BASE_URL } from 'src/util/util'

export default function RegisterInformative (): JSX.Element {
  const { email, password } = useContext(AuthContext)
  const [validForm, setValidForm] = useState(true)
  const [state, setState] = useState({
    title: '',
    description: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (email === undefined || password === undefined) {
      navigate('/login')
    }
  }, [])

  const validateForm = (): boolean => {
    return state.title.length > 0 && state.description.length > 0
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
      axios.post(BASE_URL + '/informative/register', state)
        .then(_ => {
          navigate('/informativos')
        })
        .catch(error => { console.log(error) })
      return
    }
    setValidForm(false)
  }

  return (
    <ResponsiveDrawer selected='CADASTRAR INFORMATIVO'>
      <Grid container justifyContent='center'>
        <MGridForm title={'CADASTRO DE INFORMATIVO'}>
          <Grid container direction='row'>
            <MTextField
              xs={12}
              sm={12}
              label={'Titulo'}
              name={'title'}
              type={'text'}
              margin={'dense'}
              autoFocus={true}
              required={true}
              onChange={handleChange}
              error={!validForm}
              helperText={!validForm && state.title.length === 0 && 'Informe o titulo'}
            />
          </Grid>
          <Grid container direction='row'>
            <MTextField
              xs={12}
              sm={12}
              label={'Descrição'}
              name={'description'}
              type={'text'}
              margin={'dense'}
              autoFocus={false}
              required={true}
              onChange={handleChange}
              multiline={true}
              minRows={6}
              error={!validForm}
              helperText={!validForm && state.description.length === 0 && 'Informe a descrição'}
            />
          </Grid>
          <Grid container direction='row' margin={'8px 0px 0px 0px'}>
            <Button
              onClick={handleSubmit}
              variant='contained'
              style={{ backgroundColor: '#0072F0' }}
            >
              CADASTRAR
            </Button>
          </Grid>
        </MGridForm>
      </Grid>
    </ResponsiveDrawer>
  )
}
