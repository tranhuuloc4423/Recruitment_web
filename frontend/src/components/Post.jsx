import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Line from './Line'
import Tag from './Tag'
import Button from './Button'
import StatusTag from './StatusTag'
import { LuCircleDollarSign } from 'react-icons/lu'
import { MdInfoOutline, MdOutlineFactCheck } from 'react-icons/md'
import { BsThreeDots } from 'react-icons/bs'
import { IoMdPeople } from 'react-icons/io'
import { GrMapLocation } from "react-icons/gr";
import { PiBagBold } from 'react-icons/pi'
import { FiClock } from 'react-icons/fi'
import { HiOutlineEye } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import {
  removePost,
  updateCandidateApplied,
  updateConfirmed
} from '../redux/api/post'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import CustomSwal from './CustomSwal'
import avatar from '../assets/imgs/blank-profile-picture-973460_960_720.png'

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
    authorInfo,
    type,
    views,
    desc,
    request,
    applied,
    location
  } = post
  const navigate = useNavigate()
  const locationRouter = useLocation()

  const handleConfirm = () => {
    CustomSwal({
      title: "Duyệt bài",
      text: "Bạn có chắc muốn duyệt bài viết này",
      cancelText: "Không",
      confirmText: "Duyệt",
      handle: () => updateConfirmed(post._id, { userId: currentRole._id, authorId: author })
    })
    
  }
  const handleRemove = () => {
    CustomSwal({
      title: "Xoá bài",
      text: "Bạn có chắc muốn xoá bài viết này",
      cancelText: "Không",
      confirmText: "Xoá",
      handle: () => removePost(post._id, { userId: currentRole._id, authorId: author })
    })
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
    if (currentRole?.profileStatus < 100) {
      toast.error('Vui lòng cập nhật thông tin cá nhân trước khi ứng tuyển!')
      return
    }
    if (!currentUser?._id) {
      toast.error('Vui lòng đăng nhập để ứng tuyển!')
      return
    }
    updateCandidateApplied(post?._id, currentRole?._id)
  }

  const handleView = () => {
    navigate('/manage-applied', {
      state: {
        id: post._id
      }
    })
  }

  const buttons = [
    manage?.view && { label: 'Xem', onClick: handleView },
    manage?.confirm && { label: 'Duyệt', onClick: handleConfirm },
    manage?.remove && { label: 'Xoá', onClick: handleRemove },
    manage?.update && { label: 'Cập nhật', onClick: handleUpdate },
    manage?.extend && { label: 'Gia hạn' }
  ].filter(Boolean) // Lọc ra các nút hợp lệ

  return (
    <div
      className={`flex min-h-[400px] justify-between flex-col gap-1 bg-white shadow-md p-2 rounded ${
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
        <div>
          <div className="para-1">Hạn ứng tuyển : </div>
          <div>{date_expiration}</div>
        </div>
        {type && (
          <span className="relative right-[-8px]">
            <StatusTag state={type} />
          </span>
        )}
      </div>

      {/* title */}
      <div className="heading-3 overflow-hidden">{title}</div>

      {/* image */}
      <div className="flex-row-center gap-2">
        <div className="w-[60px] h-[60px] border border-gray-100">
          <img
            src={authorInfo?.basic_info?.image?.url || avatar}
            alt="avatar"
            className="w-full h-full"
          />
        </div>
        <span className="para-1">{authorInfo?.basic_info?.name}</span>
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
          <GrMapLocation size={24} />
          <span>{`${location?.address[0]?.province?.name}`}</span>
        </span>

        <span className="flex flex-row items-center gap-2">
          <PiBagBold size={24} />
          <span>{authorInfo?.other_info?.wforms?.map((item) => (
            <Tag key={item._id} label={item.name} />
          ))}</span>
        </span>

        <span className="flex flex-row items-center gap-2">
          <FiClock size={24} />
          <span>{authorInfo?.other_info?.types?.map((item) => (
            <Tag key={item._id} label={item.name} />
          ))}</span>
        </span>
      </div>

      {/* skills */}
      <div className="flex flex-row flex-wrap gap-2">
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
        {locationRouter.pathname.includes('manage') ? (
          ''
        ) : currentUser.role === 'recruiter' || currentUser.role === 'admin' ? (
          <></>
        ) : (
          <>
            <Button label="Ứng tuyển" onClick={handleApply} />
          </>
        )}
      </div>

      {/* manage buttons */}
      <div
        className={`w-full grid gap-2 ${
          buttons.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
        }`}
      >
        {buttons.map((btn, index) => (
          <Button
            key={index}
            label={btn.label}
            onClick={btn.onClick}
            className={buttons.length === 3 && index === 2 ? 'col-span-2' : ''}
          />
        ))}
      </div>
    </div>
  )
}

export default Post
