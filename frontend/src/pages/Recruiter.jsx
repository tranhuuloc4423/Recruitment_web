import React from 'react'
import { IoLocationOutline } from 'react-icons/io5'
import { PiBagBold } from 'react-icons/pi'
import { Button, Post } from '../components'
import InfoCardToggle from '../components/InfoCardToggle'

const Recruiter = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* header */}
      <div className="flex flex-row items-center bg-white shadow-md p-4 rounded w-full gap-4">
        <div className="w-[150px] h-[150px] rounded">
          <img className="" src="https://via.placeholder.com/150" alt="" />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <span className="heading-2 font-bold">VNG Corporation</span>
          <div className="flex flex-row items-center gap-4">
            <div className="flex flex-row items-center gap-2">
              <IoLocationOutline size={24} />
              <span>Ho Chi Minh</span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <PiBagBold size={24} />
              <span>44 cong viec co san</span>
            </div>
          </div>
          <div>
            <Button label={'Theo doi'} className="w-fit" />
          </div>
        </div>
      </div>
      {/* container */}
      <div className="flex flex-row gap-8">
        {/* info company */}
        <div className="w-[70%] flex flex-col gap-2">
          <InfoCardToggle title={'Thông tin chung'} children={<>Hello</>} />
          <InfoCardToggle title={'Giới thiệu công ty'} children={<>Hello</>} />
          <InfoCardToggle
            title={'Chuyên môn của chúng tôi'}
            children={<>Hello</>}
          />
          <InfoCardToggle
            title={'Các hình ảnh của công ty'}
            children={<>Hello</>}
          />
          <InfoCardToggle title={'Địa điểm'} children={<>Hello</>} />
        </div>

        {/* company's posst */}
        <div className="w-[30%] flex flex-col gap-4">
          <span className="heading-3">{14} công việc đang tuyển</span>
          <div className="flex flex-col gap-2">
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recruiter
