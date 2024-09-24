import React, { useState } from 'react'
import { GoPlusCircle } from 'react-icons/go'
import avatar from '../assets/imgs/avatar.jpg'
import Line from '../components/Line'
import Button from '../components/Button'
import InfoCard from '../components/InfoCard'
import BasicInfoForm from './BasicInfoForm'
import { useSelector } from 'react-redux'
import RichText from '../components/RichText'
import OtherInfo from '../components/OtherInfo'
const Info = () => {
  const [open, setOpen] = useState(false)
  const { currentUser } = useSelector((state) => state.auth)
  return (
    <div className="flex flex-row gap-4">
      <div className="w-[30%] flex flex-col bg-white rounded p-4 gap-2 h-fit">
        <div className="flex flex-col items-center">
          <img
            src={avatar}
            alt="avatar"
            className="w-[100px] h-[100px] rounded-full"
          />
          <span>Trần Hữu Lộc</span>
        </div>
        <Line />
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <span>icon</span>
            <span>huuloc@gmail.com</span>
          </div>
          <div className="flex flex-row gap-2">
            <span>icon</span>
            <span>huuloc@gmail.com</span>
          </div>
          <div className="flex flex-row gap-2">
            <span>icon</span>
            <span>huuloc@gmail.com</span>
          </div>
          <div className="flex flex-row gap-2">
            <span>icon</span>
            <span>huuloc@gmail.com</span>
          </div>
        </div>
        <Line />
        <div className="w-full flex justify-center items-center">
          <Button
            label={'Cập nhật thông tin'}
            className="w-fit"
            onClick={() => setOpen(true)}
          />
          {open && (
            <BasicInfoForm
              role={currentUser.role}
              open={open}
              setOpen={setOpen}
            />
          )}
        </div>
      </div>
      <div className="w-[70%] flex flex-col gap-2">
        <OtherInfo />
      </div>
    </div>
  )
}

export default Info
