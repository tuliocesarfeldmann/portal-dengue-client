import {
  Box,
  Grid,
  Typography,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material'

interface MGridFormProps {
  spacing?: string
  title: string
  className?: string
  children: React.ReactNode
  height?: string
  width?: string
  border?: string
}

export default function MGridForm (props: MGridFormProps): JSX.Element {
  const { spacing } = props

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box display='flex' flexDirection='column' width={'100%'} minHeight={'90vh'}>
      <Grid
        container
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        display={'flex'}
        width={'100%'}
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
          border={props.border ?? 'none'}
          height={props.height ?? 'auto'}
          width={isMobile ? '90vw' : props.width ?? '100%'}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          marginLeft={'0px'}
          padding={2}
        >
          {props.children}
        </Grid>

      </Grid>
    </Box>
  )
}
