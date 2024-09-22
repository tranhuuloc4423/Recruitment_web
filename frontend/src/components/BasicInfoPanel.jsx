import React from 'react'
import Line from './Line'
import Button from './Button'
import { IoClose } from 'react-icons/io5'

const BasicInfoPanel = ({ children }) => {
  return (
    <div className="flex flex-col ">
      <div className="flex items-center justify-between">
        <span>Thông tin cơ bản</span>
        <span onClick={() => console.log(1)}>
          <IoClose size={24} color="black" />
        </span>
      </div>
      <Line />
      <div className="flex flex-col gap-4">
        <div>{/* <img src="" alt="" /> */}</div>
      </div>
      <Line />
      <div className="flex flex-row items-center justify-end gap-4">
        <Button />
        <Button />
      </div>
    </div>
  )
}

export default BasicInfoPanel
