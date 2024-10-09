import React from 'react'
import { LuCircleDollarSign, LuHeart } from 'react-icons/lu'
import { MdInfoOutline } from 'react-icons/md'
import { IoMdPeople } from 'react-icons/io'
import { IoLocationOutline } from 'react-icons/io5'
import { PiBagBold } from 'react-icons/pi'
import { FiClock } from 'react-icons/fi'
import Line from './Line'
import Tag from './Tag'
import Button from './Button'

const PostDetails = () => {
  return (
    <div className="flex flex-col bg-white rounded p-4 gap-4 shadow-md">
      {/* title */}
      <div className="heading-2">Title</div>

      {/* image */}
      <div className="flex-row-center gap-2">
        <div className="w-[60px] h-[60px]">
          <img
            src="https://via.placeholder.com/300"
            alt="avatar"
            className="w-full h-full"
          />
        </div>
        <span>Tên công ty</span>
      </div>

      <div className="flex flex-row justify-between gap-2 items-center">
        <Button label={'Ứng tuyển'} className="flex-1" />
        <Button label={'Theo dõi'} />
        <LuHeart size={32} />
      </div>

      <Line />
      {/* infos */}
      <div className="grid grid-cols-2 grid-flow-row gap-2">
        <span>
          <MdInfoOutline size={24} />
        </span>
        <span>
          <LuCircleDollarSign size={24} />
        </span>

        <span>
          <IoMdPeople size={24} />
        </span>

        <span>
          <IoLocationOutline size={24} />
        </span>

        <span>
          <PiBagBold size={24} />
        </span>
        <span>
          <FiClock size={24} />
        </span>
      </div>

      <Line />
      {/* skills */}
      <div className="flex-row-center gap-2">
        <span className="heading-3">Yêu cầu kỹ năng : </span>
        <div className="flex-row-center gap-2">
          <Tag label={'react'} />
          <Tag label={'html'} />
          <Tag label={'css'} />
        </div>
      </div>
      <Line />

      {/* description */}
      <div className="flex flex-col gap-2">
        <span className="heading-3">Mô tả công việc</span>
        <div>
          • Hot domain - Fintech - with very promising and challenging products.
          • Dynamic working environment with solid and state of the art
          technologies On the job you will: • Work with other team members to
          understand the requirements, technical solutions and deliver
          high-quality, well-tested code • Collaborate with other team members
          (backend, product, marketing, design) for external web services,
          operators who use internal operating services, and backendengineers
          who provide API
        </div>
      </div>

      <Line />
      {/* work requirement */}
      <div className="flex flex-col gap-2">
        <span className="heading-3">Yêu cầu công việc</span>
        <div>
          • Hot domain - Fintech - with very promising and challenging products.
          • Dynamic working environment with solid and state of the art
          technologies On the job you will: • Work with other team members to
          understand the requirements, technical solutions and deliver
          high-quality, well-tested code • Collaborate with other team members
          (backend, product, marketing, design) for external web services,
          operators who use internal operating services, and backendengineers
          who provide API
        </div>
      </div>
      <Line />

      {/* company's info */}
      <div className="grid grid-cols-3 grid-flow-row gap-2">
        <div className="flex flex-col gap-2">
          <span>Lĩnh vực</span>
          <span className="font-bold">Sản phẩm</span>
        </div>

        <div className="flex flex-col gap-2">
          <span>Lĩnh vực</span>
          <span className="font-bold">Sản phẩm</span>
        </div>

        <div className="flex flex-col gap-2">
          <span>Lĩnh vực</span>
          <span className="font-bold">Sản phẩm</span>
        </div>

        <div className="flex flex-col gap-2">
          <span>Lĩnh vực</span>
          <span className="font-bold">Sản phẩm</span>
        </div>

        <div className="flex flex-col gap-2">
          <span>Lĩnh vực</span>
          <span className="font-bold">Sản phẩm</span>
        </div>

        <div className="flex flex-col gap-2">
          <span>Lĩnh vực</span>
          <span className="font-bold">Sản phẩm</span>
        </div>
      </div>
    </div>
  )
}

export default PostDetails
