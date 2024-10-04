import React, { useEffect, useState } from 'react'
import Line from './Line'
import Button from './Button'
import BasicInfoForm from '../pages/BasicInfoForm'
import { useSelector } from 'react-redux'
import info from '../utils/infos'
import defaultAvatar from '../assets/imgs/blank-profile-picture-973460_960_720.png'

const BasicInfo = () => {
  const [open, setOpen] = useState(false)
  const [avatar, setAvatar] = useState(defaultAvatar)
  const [basicInfo, setBasicInfo] = useState()

  const { currentUser } = useSelector((state) => state.auth)
  const { currentRole } = useSelector((state) => state.app)

  useEffect(() => {
    if (currentUser) {
      if (currentRole?.basic_info) {
        let userImage = defaultAvatar
        userImage = currentRole?.basic_info?.image || defaultAvatar
        setAvatar(userImage)
        console.log(currentRole?.basic_info)
      }

      const infoToUpdate = info.find(
        (item) => item?.name === currentUser?.role
      )?.basicInfo
      setBasicInfo(infoToUpdate || [])
    }
  }, [currentRole])

  return (
    <div className="w-[30%] flex flex-col bg-white rounded p-4 gap-2 h-fit">
      <div className="flex flex-col gap-2 items-center">
        <img
          src={avatar}
          alt="avatar"
          className="w-[100px] h-[100px] rounded-full"
        />
        <span className="heading-3">{currentUser.name}</span>
      </div>
      <Line />
      <div className="flex flex-row gap-2">
        <div className="flex flex-col">
          {basicInfo?.map(({ name, label, icon }) => (
            <React.Fragment key={name}>
              {icon && (
                <div className="flex items-center gap-2 py-2 px-2">
                  <span>{icon}</span>
                  {/* <span className="para-1 font-medium">{label}:</span> */}
                  <span>{currentRole?.basic_info[name]}</span>
                </div>
              )}
            </React.Fragment>
          ))}
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
  )
}

export default BasicInfo
