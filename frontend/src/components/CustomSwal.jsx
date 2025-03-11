import React from 'react'
import Swal from 'sweetalert2'

const CustomSwal = ({ title, text, icon, cancelText, confirmText, handle}) => {
  return (
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: cancelText,
        confirmButtonText: confirmText
      }).then(async (result) => {
        if (result.isConfirmed) {
          handle()
        }
      })
  )
}

export default CustomSwal