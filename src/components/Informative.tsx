import { Container, Typography } from '@mui/material'

interface InformativeProps {
  title: string
  description: string
}

export default function Informative ({ title, description }: InformativeProps): JSX.Element {
  return (
    <Container style={{
      width: '98%',
      height: '200px',
      boxShadow: '2px 2px 2px 2px rgb(0, 0, 0, 0.9)',
      color: '#000',
      borderRadius: '10px',
      padding: '10px',
      margin: '15px 10px 15px 10px',
      fontFamily: 'Trebuchet MS, sans-serif',
      backgroundColor: '#FFF'
    }} >
      <Typography variant='h5'>{title}</Typography>
      <hr />
      <Typography variant='body1' lineHeight={'1.5'}>{description}</Typography>
    </Container>
  )
}
