import React, { useState } from 'react'
import dayjs from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers'
import { TextField } from '@mui/material'

const DateTimePicker = ({ date, setDate, validDate, minDate, maxDate }) => {
  // const [selectedDate, setSelectedDate] = useState(null)
  const today = dayjs().add(1, 'day')
  // const validate = dayjs(minDate)

  const handleDateChange = (date) => {
    setDate(date)
  }

  return (
    <DatePicker
      format="DD/MM/YYYY"
      value={date}
      onChange={handleDateChange}
      minDate={minDate || undefined}
      maxDate={maxDate || undefined}
      shouldDisableDate={validDate ? (date) => date < today : undefined}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: '400',
          outline: 'none',
          fontFamily: 'Lexend',
          ':hover': {
            borderColor: '#e5e7eb'
          },
          outlineColor: '#e5e7eb',
          ':focus': {
            borderColor: '#e5e7eb'
          }
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: '2px solid',
          borderColor: '#e5e7eb'
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#e5e7eb'
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#e5e7eb'
        }
      }}
      renderInput={(params) => <input {...params} placeholder="time" />}
    />
  )
}

export default DateTimePicker
