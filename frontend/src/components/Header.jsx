import React from 'react'
import logo from '../assets/imgs/LogoLHU_Daf.png'

import Account from './Account'
import nav from '../utils/nav'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import Noti from './Noti'
const Header = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full flex justify-between items-center bg-primary px-8 h-[80px]">
      <div className="flex gap-4 items-center h-full">
        <img src={logo} alt="Logo Lac Hong" className="w-[70px] h-[70px]" />
        <div className="flex text-white h-full">
          {/* <div className="px-4 h-full flex items-center cursor-pointer hover:bg-[rgba(0,0,0,0.3)]">
            Tin tuyển dụng
          </div> */}
        </div>
      </div>
      <div className="flex gap-4 items-center">
        {/* <Noti /> */}

        {/* <Account /> */}
        <Button
          label={'Đăng nhập'}
          className="border border-white "
          onClick={() => navigate('/signin')}
        />
        <Button
          label={'Đăng ký'}
          className="border border-white "
          onClick={() => navigate('/signup')}
        />
      </div>
    </div>
  )
}

export default Header
