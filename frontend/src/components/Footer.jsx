import React from 'react'
import logo from '../assets/imgs/Logo_Dai_Hoc_Lac_Hong.png'
const Footer = () => {
  return (
    <div className="flex flex-col gap-2 px-8 py-4 bg-primary w-full">
      <div className="flex gap-8">
        <img className={` h-[70px]`} src={logo} alt="" />
        <div className="flex flex-col gap-2">
          <div className="text-white">Liên hệ</div>
          <div className="text-[#C0D6E2]">
            <div className="cursor-pointer py-1">Hotline: 123456789</div>
            <div className="cursor-pointer py-1">Email: admin@lhu.edu.vn</div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-white">Liên hệ</div>
          <div className="text-[#C0D6E2]">
            <div className="cursor-pointer py-1">Hotline: 123456789</div>
            <div className="cursor-pointer py-1">Email: admin@lhu.edu.vn</div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-white">Liên hệ</div>
          <div className="text-[#C0D6E2]">
            <div className="cursor-pointer py-1">Hotline: 123456789</div>
            <div className="cursor-pointer py-1">Email: admin@lhu.edu.vn</div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-white">Liên hệ</div>
          <div className="text-[#C0D6E2]">
            <div className="cursor-pointer py-1">Hotline: 123456789</div>
            <div className="cursor-pointer py-1">Email: admin@lhu.edu.vn</div>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-black"></div>
      <div className="text-center heading-3 text-white">Copyright ©</div>
    </div>
  )
}

export default Footer
