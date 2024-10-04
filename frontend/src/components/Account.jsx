import React, { useEffect, useState } from 'react'

import defaultAvatar from '../assets/imgs/blank-profile-picture-973460_960_720.png'
import { IoIosArrowDown } from 'react-icons/io'
import { IoSettingsOutline } from 'react-icons/io5'
import { LuLogOut } from 'react-icons/lu'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Account = () => {
  const [active, setActive] = useState(false)
  const { currentUser } = useSelector((state) => state.auth)
  const { currentRole } = useSelector((state) => state.app)
  const [avatar, setAvatar] = useState(defaultAvatar)
  useEffect(() => {
    if (currentUser) {
      let userImage = defaultAvatar
      userImage = currentRole?.basic_info?.image || defaultAvatar
      setAvatar(userImage)
    }
  }, [currentUser, currentRole])

  return (
    <div
      className="border border-white rounded p-2 flex items-center gap-2 relative cursor-pointer"
      onClick={() => setActive(!active)}
    >
      <img src={avatar} alt="avatar" className="rounded-full w-10 h-10" />
      <div className="text-white select-none">
        {currentRole?.basic_info?.name}
      </div>
      <IoIosArrowDown
        size={24}
        color="white"
        className={`transition-transform ${
          active
            ? 'rotate-180 duration-200 ease-in'
            : 'rotate-0 duration-200 ease-out'
        }`}
      />
      <div
        className={`absolute select-none w-full top-[100%] left-0 bg-white shadow-md flex flex-col rounded transition-transform ${
          active ? 'translate-y-0' : '-translate-y-10 opacity-0'
        } ${active ? 'duration-200' : 'duration-200'}`}
      >
        <Link to={'/settings'} className="flex items-center gap-2 px-4 py-2">
          <IoSettingsOutline />
          Cài đặt
        </Link>
        <div
          className="flex items-center gap-2 px-4 py-2"
          onClick={() => console.log(1)}
        >
          <LuLogOut />
          Đăng xuất
        </div>
      </div>
    </div>
  )
}

export default Account
