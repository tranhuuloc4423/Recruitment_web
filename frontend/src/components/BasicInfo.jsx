import React, { useEffect, useState } from 'react'
import Line from './Line'
import Button from './Button'
import BasicInfoForm from '../pages/BasicInfoForm'
import { useSelector } from 'react-redux'
import info from '../utils/infos'
import defaultAvatar from '../assets/imgs/blank-profile-picture-973460_960_720.png'
import { IoLocationOutline } from 'react-icons/io5'
import CircleProgress from './CircleProgress'
import ProgressBar from './ProgressBar'

const BasicInfo = () => {
  const [open, setOpen] = useState(false)
  const [avatar, setAvatar] = useState(defaultAvatar)
  const [basicInfo, setBasicInfo] = useState([])

  const { currentUser } = useSelector((state) => state.auth)
  const { currentRole } = useSelector((state) => state.app)

  useEffect(() => {
    console.log('currentRole has changed:', currentRole)

    if (currentRole?.basic_info) {
      let userImage = currentRole?.basic_info?.image?.url || defaultAvatar
      setAvatar(userImage)
    }
    const infoToUpdate = info.find(
      (item) => item?.name === currentUser?.role
    )?.basicInfo

    setBasicInfo(infoToUpdate || [])
  }, [currentRole.basic_info])

  return (
    <div className="flex flex-col w-[30%] gap-4">
      <div className="w-full flex flex-col bg-white rounded p-4 gap-2 h-fit">
        <div className="flex flex-col gap-2 items-center">
          <img
            src={avatar}
            alt="avatar"
            className="w-[100px] h-[100px] rounded-full"
          />
          <span className="heading-3">{currentRole?.basic_info?.name}</span>
        </div>
        <Line />
        <div className="flex flex-row gap-2">
          <div className="flex flex-col">
            {basicInfo?.map(({ name, label, icon }) => (
              <React.Fragment key={name}>
                {icon && (
                  <div className="flex items-center gap-2 py-2 px-2">
                    <span>{icon}</span>
                    {name === 'gender' ? (
                      <span>{currentRole?.basic_info.gender?.name}</span>
                    ) : (
                      <span>{currentRole?.basic_info[name]}</span>
                    )}
                  </div>
                )}
              </React.Fragment>
            ))}
            <div className="flex items-center gap-2 py-2 px-2">
              <IoLocationOutline size={24} />
              <span>{`${currentRole?.basic_info.address?.province?.name}, ${currentRole?.basic_info.address?.district?.name}`}</span>
            </div>
          </div>
        </div>
        <Line />
        <div className="w-full flex justify-center items-center">
          <Button
            label={'Cập nhật thông tin'}
            className="w-fit"
            onClick={() => setOpen(true)}
          />
          {open && <BasicInfoForm open={open} setOpen={setOpen} />}
        </div>
      </div>
      <div className="bg-white rounded shadow-md w-full flex justify-center items-center">
        <ProgressBar progress={currentRole.profileStatus} />
      </div>
    </div>
  )
}

export default BasicInfo
