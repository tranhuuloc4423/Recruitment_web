import React, { useState } from 'react'
import { GoPlusCircle } from 'react-icons/go'
import { IoClose } from 'react-icons/io5'
import Line from './Line'
import Button from './Button'

const InfoCard = (props) => {
  const { title, desc, children, childTitle, onClick } = props
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="flex flex-row items-center justify-between bg-white rounded p-4">
        <div className="flex flex-col gap-2">
          <span className="heading-3">{title}</span>
          <span className="">{desc}</span>
        </div>
        <div onClick={() => setOpen(true)}>
          <GoPlusCircle size={32} color="#284F9E" />
        </div>
      </div>
      {open && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.2)]"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-1/2 bg-white rounded flex flex-col gap-2 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <span>{childTitle}</span>
              <span onClick={() => setOpen(false)}>
                <IoClose size={24} color="black" />
              </span>
            </div>
            <Line />
            {children}
            <Line />
            <div>
              <Button label={'Lưu'} onClick={onClick} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default InfoCard
