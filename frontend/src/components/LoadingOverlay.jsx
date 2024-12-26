import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-[9999] bg-[rgba(0,0,0,0.15)]">
      <CircularProgress size="100px" />
    </div>
  )
}

export default LoadingOverlay
