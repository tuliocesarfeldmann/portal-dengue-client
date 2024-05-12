import {
  Box,
  Grid,
  Typography,
  Paper
} from '@mui/material'

interface MGridFormProps {
  spacing?: string
  title: string
  className?: string
  children: React.ReactNode
}

export default function MGridForm (props: MGridFormProps): JSX.Element {
  const { spacing } = props
  return (
    <Box display='flex' flexDirection='column' sx={{ paddingRight: '5%', paddingLeft: '5%' }} >
      <Grid
        container
        direction={'column'}
        padding={2}
        spacing={4}
        justifyContent={'center'}
        alignItems={'center'}
        display={'flex'}
      >
        <Grid item padding={2}>
          <Typography
            variant={'h5'}
            marginBottom={'10px'}
            color={'#0072F0'}
          >
            {props.title}
          </Typography>
        </Grid>

        <Grid
          className={props.className}
          container
          item
          direction={'row'}
          spacing={spacing ?? 2}
          component={Paper}
          variant='outlined'
          borderRadius={'20px'}
          border={'2px solid #0072F0'}
          padding={2}
        >
          {props.children}
        </Grid>

      </Grid>
    </Box>
  )
}
