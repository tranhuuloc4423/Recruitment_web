import React, { useState } from 'react'
import { GoPlusCircle } from 'react-icons/go'
import avatar from '../assets/imgs/blank-profile-picture-973460_960_720.png'
import Line from '../components/Line'
import Button from '../components/Button'
import InfoCard from '../components/InfoCard'
import BasicInfoForm from './BasicInfoForm'
import { useSelector } from 'react-redux'
import RichText from '../components/RichText'
import OtherInfo from '../components/OtherInfo'
import Nav from '../components/Nav'
import paths from '../utils/paths'

const {HOME,CANDIDATE, INFO} = paths

const candidateNavInfo = [
  {
    name: "Hồ sơ",
    path: '/' + HOME + '/' + CANDIDATE + '/' + INFO + '/' + 'profile',
    active: true,
    id: 0
  },
  {
    name: "CV",
    path: '/' + HOME + '/' + CANDIDATE + '/' + INFO + '/' + 'cv',
    active: false,
    id: 1
  },
  {
    name: "Tiêu chí",
    path: '/' + HOME + '/' + CANDIDATE + '/' + INFO + '/' + 'targets',
    active: false,
    id: 2
  },
]

const Info = () => {
  const [open, setOpen] = useState(false)
  const { currentUser } = useSelector((state) => state.auth)
  return (
    <div className='flex flex-col gap-4'>
      {currentUser.role === 'candidate' && <Nav data={candidateNavInfo} />}
      <div className="flex flex-row gap-4">
      <div className="w-[30%] flex flex-col bg-white rounded p-4 gap-2 h-fit">
        <div className="flex flex-col items-center">
          <img
            src={avatar}
            alt="avatar"
            className="w-[100px] h-[100px] rounded-full"
          />
          <span>{currentUser.name}</span>
        </div>
        <Line />
        <div className="flex flex-col gap-2">
          {/* <div className="flex flex-row gap-2">
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
          </div> */}
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
    </div>
  )
}

export default Info
