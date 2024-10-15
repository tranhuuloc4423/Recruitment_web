import React, { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import Line from './Line'
const InfoCardToggle = (props) => {
  const { title, children } = props
  const [open, setOpen] = useState(true)
  return (
    <div className="flex flex-col bg-white rounded p-4 gap-2 w-full">
      <div className="flex flex-row items-center justify-between">
        <span className="heading-3">{title}</span>
        <span onClick={() => setOpen(!open)} className="cursor-pointer">
          <IoIosArrowDown size={24} />
        </span>
      </div>
      <Line />
      {open && <div className="w-full">{children}</div>}
    </div>
  )
}

export default InfoCardToggle
