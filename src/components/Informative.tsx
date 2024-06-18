import { Container, IconButton, Typography } from '@mui/material'
import { useContext } from 'react'
import { AuthContext } from 'src/AuthContext'
import DeleteIcon from '@mui/icons-material/Delete'

interface InformativeProps {
  id: number
  title: string
  description: string
  handleDelete: () => void
}

export default function Informative ({ title, description, handleDelete }: InformativeProps): JSX.Element {
  const { isUserLogged } = useContext(AuthContext)

  return (
    <Container style={{
      width: '98%',
      minHeight: '200px',
      boxShadow: '2px 2px 2px 2px rgb(0, 0, 0, 0.9)',
      color: '#000',
      borderRadius: '10px',
      padding: '10px',
      margin: '15px 10px 15px 10px',
      fontFamily: 'Trebuchet MS, sans-serif',
      backgroundColor: '#FFF'
    }} >
      <div style={{
        display: 'flex',
        flexDirection: 'row'
      }}>
        <Typography variant='h5'>{title}</Typography>
        <div style={{ flex: '1' }}/>
        {isUserLogged() && <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>}
      </div>
      <hr />
      <Typography variant='body1' lineHeight={'1.5'}>{description}</Typography>
    </Container>
  )
}
