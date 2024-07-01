import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider'
import React from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DatePicker } from '@mui/x-date-pickers'

const DatePickerMui = (props: any) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
        {...props}
        />
    </LocalizationProvider>
  )
}

export default DatePickerMui