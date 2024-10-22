import React, { useEffect, useState } from 'react'
import Line from './Line'
import Tag from './Tag'
import Button from './Button'
import { LuCircleDollarSign } from 'react-icons/lu'
import { MdInfoOutline, MdOutlineFactCheck } from 'react-icons/md'
import { IoMdPeople } from 'react-icons/io'
import { IoLocationOutline } from 'react-icons/io5'
import { PiBagBold } from 'react-icons/pi'
import { FiClock } from 'react-icons/fi'
import { HiOutlineEye } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { getRoleData } from '../redux/api/post'

const Post = ({ post }) => {
  const { currentUser } = useSelector((state) => state.auth)
  const { currentRole } = useSelector((state) => state.app)
  const {
    title,
    skills,
    salary,
    quantity,
    date,
    date_expiration,
    author,
    authorType
  } = post
  const [name, setName] = useState('')
  const [image, setImage] = useState('')

  const getBasicData = async () => {
    console.log(post)
    const res = await getRoleData(authorType, author)
    console.log(res)
    // setName(res.basic_info?.name)
    // setImage(res.basic_info?.image.url)
  }

  useEffect(() => {
    getBasicData()
  }, [])

  return (
    <div className="flex flex-col gap-2 bg-white shadow-md p-2 rounded">
      {/* state */}
      {/* <div className="flex-row-center gap-2">
        <span>Trạng thái : </span>
        <span>Đã duyệt</span>
      </div> */}

      {/* time and tag */}
      <div className="flex-row-center justify-between ">
        <span className="para-3">Hạn ứng tuyển : {date_expiration}</span>
        <span>Tag hot</span>
      </div>

      {/* title */}
      <div className="heading-3">{title}</div>

      {/* image */}
      <div className="flex-row-center gap-2">
        <div className="w-[60px] h-[60px]">
          <img
            src={image || 'https://via.placeholder.com/300'}
            alt="avatar"
            className="w-full h-full"
          />
        </div>
        <span>{name || 'fpt'}</span>
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

      {/* skills */}
      <div className="flex-row-center gap-2">
        <span>Kỹ năng : </span>
        <div className="flex-row-center gap-2">
          <Tag label={'react'} />
          <Tag label={'html'} />
          <Tag label={'css'} />
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
