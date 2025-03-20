import React from 'react'
import logo from '../assets/imgs/Logo_Dai_Hoc_Lac_Hong.png'
const Footer = () => {
  return (
    <div className="flex flex-col gap-2 py-2 bg-primary w-full">
      {/* <div className="flex gap-8">
        
        <div className="flex flex-col gap-2">
          <div className="text-white">Tin tuyển dụng</div>
          <div className="text-[#C0D6E2]">
            <div className="cursor-pointer py-1">Tin tuyển dụng</div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-white">Thông tin</div>
          <div className="text-[#C0D6E2]">
            <div className="cursor-pointer py-1">Cập nhật thông tin</div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-white">Tài khoản</div>
          <div className="text-[#C0D6E2]">
            <div className="cursor-pointer py-1">Cài đặt</div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-white">Liên hệ</div>
          <div className="text-[#C0D6E2]">
            <div className="cursor-pointer py-1">Hotline: 123456789</div>
            <div className="cursor-pointer py-1">Email: admin@lhu.edu.vn</div>
          </div>
        </div>
      </div> */}
      {/* <div className="w-full h-[1px] bg-black"></div> */}
      <div className='flex flex-row items-center justify-center'>
      <div className="text-center text-white">
      Copyright ©</div>
      <img className={` h-[50px]`} src={logo} alt="" />
      </div>
      
    </div>
  )
}

export default Footer
