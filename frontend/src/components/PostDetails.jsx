import React, { useEffect, useState } from 'react'
import { LuCircleDollarSign, LuHeart } from 'react-icons/lu'
import { MdInfoOutline } from 'react-icons/md'
import { IoMdPeople } from 'react-icons/io'
import { IoLocationOutline } from 'react-icons/io5'
import { PiBagBold } from 'react-icons/pi'
import { FiClock } from 'react-icons/fi'
import Line from './Line'
import Tag from './Tag'
import Button from './Button'
import {
  getPost,
  getRoleData,
  savePost,
  updateCandidateApplied
} from '../redux/api/post'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { formatSalary } from '../utils/functions'
import emptybox from '../assets/imgs/emptybox.png'
import { Skeleton } from '@mui/material'

const PostDetails = ({ id }) => {
  const { currentRole } = useSelector((state) => state.app)
  const { currentUser } = useSelector((state) => state.auth)
  const [post, setPost] = useState(null)
  const [basicInfo, setBasicInfo] = useState()
  const [otherInfo, setOtherInfo] = useState()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [save, setSave] = useState(false)

  const getPostById = async (id) => {
    setLoading(true)
    try {
      const res = await getPost(id)
      setPost(res)
      setBasicInfo(res.authorInfo.basic_info)
      setOtherInfo(res.authorInfo.other_info)
    } catch (error) {
      console.error('Lỗi khi lấy bài đăng:', error)
      setPost(null) // Nếu lỗi, set post về null nhưng không hiển thị emptybox trừ khi id == null
    } finally {
      setTimeout(() => setLoading(false), 200)
    }
  }

  const handleApply = () => {
    if (currentRole.profileStatus < 100) {
      toast.error('Vui lòng cập nhật thông tin cá nhân trước khi ứng tuyển!')
      return
    }
    if (!currentUser?._id) {
      toast.error('Vui lòng đăng nhập để ứng tuyển!')
      return
    }
    updateCandidateApplied(post?._id, currentRole._id)
  }

  const handleSavePost = async (id) => {
    await savePost(id, currentRole._id)
    setSave(true)
  }

  useEffect(() => {
    if (id) {
      getPostById(id)
    } else {
      setLoading(false) // Nếu id == null, không gọi API và set loading = false ngay
    }
  }, [id])

  return (
    <>
      {loading ? (
        // Hiển thị Skeleton khi đang tải
        <div className="flex flex-col bg-white rounded p-4 gap-4 shadow-md">
          <Skeleton variant="text" width="60%" height={40} />
          <div className="flex-row-center gap-2">
            <Skeleton variant="rectangular" width={60} height={60} />
            <Skeleton variant="text" width="20%" />
          </div>
          <div className="flex flex-row justify-between gap-2">
            <Skeleton variant="rectangular" width="30%" height={40} />
            <Skeleton variant="rectangular" width="20%" height={40} />
            <Skeleton variant="rectangular" width="20%" height={40} />
          </div>
          <Skeleton variant="rectangular" width="100%" height={1} />
          <div className="grid grid-cols-2 gap-2">
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="80%" />
          </div>
          <div className="flex-row-center gap-2">
            <Skeleton variant="text" width="20%" />
            <Skeleton variant="rectangular" width="50%" height={20} />
          </div>
          <Skeleton variant="rectangular" width="100%" height={1} />
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="100%" height={100} />
          <Skeleton variant="rectangular" width="100%" height={1} />
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="100%" height={100} />
          <Skeleton variant="rectangular" width="100%" height={1} />
          <div className="grid grid-cols-3 gap-2">
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="80%" />
          </div>
        </div>
      ) : id == null ? (
        // Hiển thị emptybox khi id == null
        <div className="flex flex-col items-center justify-center border-2 p-4 rounded-md">
          <img src={emptybox} alt="" />
          <div className="text-xl text-gray-500 font-bold">
            Không tìm thấy tin tuyển dụng nào...
          </div>
        </div>
      ) : post ? (
        // Hiển thị dữ liệu khi tải xong và có post
        <div className="flex flex-col bg-white rounded p-4 gap-4 shadow-md">
          <div className="heading-2">{post?.title}</div>
          <div className="flex-row-center gap-2">
            <div className="w-[60px] h-[60px] border border-gray-100">
              <img
                src={basicInfo?.image?.url}
                alt="avatar"
                className="w-full h-full"
              />
            </div>
            <span>{basicInfo?.name}</span>
          </div>
          <div className="flex flex-row justify-between gap-2 items-center">
            {currentUser.role === 'candidate' && (
              <Button
                label={'Ứng tuyển'}
                className="flex-1"
                onClick={handleApply}
              />
            )}
            <Button
              label={'Xem công ty'}
              onClick={() =>
                navigate(`/company/${post?.authorType}/${post?.author}`)
              }
            />
            {currentUser.role === 'candidate' && (
              <Button
                label={'Theo dõi'}
                className="bg-second text-black"
                onClick={() => handleSavePost(post?._id)}
              />
            )}
          </div>
          <Line />
          <div className="grid grid-cols-2 grid-flow-row gap-2">
            <span className="flex flex-row items-center gap-2">
              <LuCircleDollarSign size={24} />
              <span>{formatSalary(post?.salary)} vnđ</span>
            </span>
            <span className="flex flex-row items-center gap-2">
              <IoMdPeople size={24} />
              <span>{post?.quantity} người</span>
            </span>
            <span className="flex flex-row items-center gap-2">
              <IoLocationOutline size={24} />
              <span>{`${basicInfo?.address?.province?.name}, ${basicInfo?.address?.district?.name}`}</span>
            </span>
            <span className="flex flex-row items-center gap-2">
              <PiBagBold size={24} />
              <span>{otherInfo?.wforms?.map((item) => (<Tag key={item?.value} label={item?.name} />))}</span>
            </span>
          </div>
          <div className="flex-row-center gap-2">
            <span className="para-1">Yêu cầu kỹ năng : </span>
            <div className="flex-row-center flex-wrap justify-end gap-2">
              {post?.skills?.map((skill) => (
                <Tag key={skill?.value} label={skill?.name} />
              ))}
            </div>
          </div>
          <Line />
          <div className="flex flex-col gap-2">
            <span className="heading-3">Mô tả công việc:</span>
            <div dangerouslySetInnerHTML={{ __html: post?.desc }}></div>
          </div>
          <Line />
          <div className="flex flex-col gap-2">
            <span className="heading-3">Yêu cầu công việc:</span>
            <div dangerouslySetInnerHTML={{ __html: post?.request }}></div>
          </div>
          <Line />
          <div className="grid grid-cols-2 md:grid-cols-3 grid-flow-row gap-2">
            <div className="flex flex-col gap-2">
              <span className="font-semibold">Lĩnh vực</span>
              <span className="">{basicInfo?.field}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold">Mã số thuế</span>
              <span className="">{basicInfo?.tax_id}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold">Số điện thoại</span>
              <span className="">{basicInfo?.phone}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold">Email</span>
              <span className="">{basicInfo?.email}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold">Địa chỉ</span>
              <span className="">{`${basicInfo?.address?.province?.name}, ${basicInfo?.address?.district?.name}`}</span>
            </div>
          </div>
        </div>
      ) : (
        // Nếu id hợp lệ nhưng không có post, không hiển thị emptybox mà có thể thêm thông báo khác
        <div className="flex flex-col items-center justify-center border-2 p-4 rounded-md">
          <div className="text-xl text-gray-500 font-bold">
            Không tìm thấy bài đăng với ID này...
          </div>
        </div>
      )}
    </>
  )
}

export default PostDetails