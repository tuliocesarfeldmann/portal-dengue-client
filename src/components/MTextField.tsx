/* eslint-disable import/no-anonymous-default-export */
import {
  TextField,
  Grid
} from '@mui/material'

interface TextFieldProps {
  variant?: 'filled' | 'outlined' | 'standard'
  xs?: any
  sm?: any
  label: string
  name: string
  type: string
  autoFocus: boolean
  required: boolean
  disabled?: boolean
  onChange?: any
  multiline?: boolean
  minRows?: number
  margin?: 'dense' | 'none' | 'normal'
  defaultValue?: string
  error?: boolean
  helperText?: React.ReactNode
}

export default function MTextField (props: TextFieldProps): JSX.Element {
  const { variant } = props
  return (
    <Grid item xs={props.xs} sm={props.sm}>
      <TextField
        {...props}
        variant={variant ?? 'outlined'}
        fullWidth={true}
      />
    </Grid>
  )
}
