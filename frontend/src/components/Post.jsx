import React, { useEffect, useState } from 'react'
import Line from './Line'
import Tag from './Tag'
import Button from './Button'
import StatusTag from './StatusTag'
import { LuCircleDollarSign } from 'react-icons/lu'
import { MdInfoOutline, MdOutlineFactCheck } from 'react-icons/md'
import { IoMdPeople } from 'react-icons/io'
import { IoLocationOutline } from 'react-icons/io5'
import { PiBagBold } from 'react-icons/pi'
import { FiClock } from 'react-icons/fi'
import { HiOutlineEye } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { getRoleData } from '../redux/api/post'

const Post = ({ post, select }) => {
  const { currentUser } = useSelector((state) => state.auth)
  const { currentRole } = useSelector((state) => state.app)
  const {
    title,
    skills,
    salary,
    quantity,
    date_expiration,
    author,
    authorType,
    type
  } = post
  const [basicInfo, setBasicInfo] = useState()
  const [otherInfo, setOtherInfo] = useState()

  const getBasicData = async () => {
    console.log(post)
    const res = await getRoleData(authorType, author)
    console.log(res)
    setBasicInfo(res.basic_info)
    setOtherInfo(res.other_info)
  }

  useEffect(() => {
    getBasicData()
  }, [])

  return (
    <div
      className={`flex flex-col gap-2 bg-white shadow-md p-2 rounded ${
        select === post._id ? 'border-2 border-l-8 border-second' : ''
      }`}
    >
      {/* state */}
      {/* <div className="flex-row-center gap-2">
        <span>Trạng thái : </span>
        <span>Đã duyệt</span>
      </div> */}

      {/* time and tag */}
      <div className="flex-row-center justify-between w-full">
        <span className="para-1">Hạn ứng tuyển : {date_expiration}</span>
        {type !== 'normal' && (
          <span className="relative right-[-8px]">
            <StatusTag state={type} />
          </span>
        )}
      </div>

      {/* title */}
      <div className="heading-3">{title}</div>

      {/* image */}
      <div className="flex-row-center gap-2">
        <div className="w-[60px] h-[60px] border border-gray-100">
          <img
            src={basicInfo?.image?.url || 'https://via.placeholder.com/300'}
            alt="avatar"
            className="w-full h-full"
          />
        </div>
        <span className="para-1">{basicInfo?.name}</span>
      </div>

      <Line />
      {/* infos */}
      <div className="grid grid-cols-2 grid-flow-row gap-2 text-black-100">
        <span className="flex flex-row items-center gap-2">
          <LuCircleDollarSign size={24} />
          <span>{salary}</span>
        </span>

        <span className="flex flex-row items-center gap-2">
          <IoMdPeople size={24} />
          <span>{quantity} người</span>
        </span>

        <span className="flex flex-row items-center gap-2">
          <IoLocationOutline size={24} />
          <span>{`${basicInfo?.address?.province?.name}`}</span>
        </span>

        <span className="flex flex-row items-center gap-2">
          <PiBagBold size={24} />
          {/* <span>{`${otherInfo.?.}`}</span> */}
        </span>
      </div>

      {/* skills */}
      <div className="flex-row-center gap-2">
        <span>Kỹ năng : </span>
        <div className="flex-row-center gap-2">
          {skills.map((skill, index) => (
            <Tag key={index} label={skill.name} />
          ))}
        </div>
      </div>
      <Line />

      {/* view and applied */}
      <div className="flex flex-col">
        <div className="flex-row-center gap-2">
          <HiOutlineEye size={24} />
          <span>Lượt xem : {44}</span>
        </div>
        <div className="flex-row-center gap-2">
          <MdOutlineFactCheck size={24} />
          <span>Lượt ứng tuyển : {44}</span>
        </div>
      </div>

      <Line />

      {/* applied button */}
      <div className="flex flex-row justify-end">
        <Button label="Ứng tuyển" className="w-fit" />
      </div>

      {/* manage buttons */}
      {/* <div className="w-full flex flex-row justify-end gap-2">
        <Button label="Xem" />
        <Button label="Gia hạn" />
        <Button label="Cập nhật" />
        <Button label="Xoá" />
      </div> */}
    </div>
  )
}

export default Post
