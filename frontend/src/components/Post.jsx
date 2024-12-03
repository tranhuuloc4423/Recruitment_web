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
import {
  getRoleData,
  removePost,
  updateCandidateApplied,
  updateConfirmed
} from '../redux/api/post'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Post = ({ post, select, manage }) => {
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
    type,
    views,
    desc,
    request,
    applied,
    location
  } = post
  // const { view, confirm, remove, update, extend } = manage
  const [basicInfo, setBasicInfo] = useState()
  const [otherInfo, setOtherInfo] = useState()
  const navigate = useNavigate()

  const getBasicData = async () => {
    console.log(post)
    const res = await getRoleData(authorType, author)
    console.log(res)
    setBasicInfo(res?.basic_info)
    setOtherInfo(res?.other_info)
  }

  useEffect(() => {
    getBasicData()
  }, [])

  const handleConfirm = () => {
    updateConfirmed(post._id, { userId: currentRole._id, authorId: author })
  }
  const handleRemove = () => {
    removePost(post._id, { userId: currentRole._id, authorId: author })
  }

  const handleUpdate = () => {
    navigate('/manage/create-post', {
      state: {
        id: post._id,
        updateTitle: title,
        updateSalary: salary,
        updateQuantity: quantity,
        updateDesc: desc,
        updateRequest: request,
        updateDate: date_expiration,
        skillsUpdate: skills
      }
    })
  }

  const handleApply = () => {
    if (currentRole.profileStatus < 100) {
      toast.error('Vui lòng cập nhật thông tin cá nhân trước khi ứng tuyển!')
      return
    }
    updateCandidateApplied(post?._id, currentRole._id)
  }

  const handleView = () => {
    navigate('/manage-applied', {
      state: {
        id: post._id
      }
    })
  }

  return (
    <div
      className={`flex min-h-[400px] flex-col gap-2 bg-white shadow-md p-2 rounded ${
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
        {type && (
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
          <span>{new Intl.NumberFormat('de-DE').format(salary)} vnđ</span>
        </span>

        <span className="flex flex-row items-center gap-2">
          <IoMdPeople size={24} />
          <span>{quantity} người</span>
        </span>

        <span className="flex flex-row items-center gap-2">
          <IoLocationOutline size={24} />
          <span>{`${location?.address[0]?.province?.name}`}</span>
        </span>

        <span className="flex flex-row items-center gap-2">
          <PiBagBold size={24} />
          {/* <span>{`${otherInfo.?.}`}</span> */}
        </span>
      </div>

      {/* skills */}
      <div className="flex-col gap-2">
        <span>Kỹ năng : </span>
        <div className="flex-row-center flex-wrap gap-2 mt-1">
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
          <span>Lượt xem : {views}</span>
        </div>
        <div className="flex-row-center gap-2">
          <MdOutlineFactCheck size={24} />
          <span>Lượt ứng tuyển : {applied?.length}</span>
        </div>
      </div>

      <Line />

      {/* applied button */}
      <div className="flex flex-row justify-end">
        {currentUser.role === 'candidate' && (
          <Button label="Ứng tuyển" onClick={handleApply} />
        )}
      </div>

      {/* manage buttons */}
      <div className="w-full grid grid-cols-2 grid-flow-row gap-2">
        {manage?.view && <Button label="Xem" onClick={handleView} />}
        {manage?.confirm && <Button label="Duyệt" onClick={handleConfirm} />}
        {manage?.remove && <Button label="Xoá" onClick={handleRemove} />}
        {manage?.update && <Button label="Cập nhật" onClick={handleUpdate} />}
        {manage?.extend && <Button label="Gia hạn" />}
      </div>
    </div>
  )
}

export default Post
