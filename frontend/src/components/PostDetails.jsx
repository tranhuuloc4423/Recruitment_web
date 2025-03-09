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
import { getPost, getRoleData, savePost, updateCandidateApplied } from '../redux/api/post'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const PostDetails = ({ id }) => {
  const { currentRole } = useSelector((state) => state.app)
  const { currentUser } = useSelector((state) => state.auth)
  const [post, setPost] = useState()
  const [basicInfo, setBasicInfo] = useState()
  const [otherInfo, setOtherInfo] = useState()
  const navigate = useNavigate()
  const [save, setSave] = useState(false)

  const getBasicData = async (post) => {
    const res = await getRoleData(post?.authorType, post?.author)
    setBasicInfo(res?.basic_info)
    setOtherInfo(res?.other_info)
    console.log(res?.basic_info)
    console.log(res?.other_info)
  }

  const getPostById = async (id) => {
    const res = await getPost(id)
    console.log(res)
    setPost(res)
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
    console.log("save")
    const res = await savePost(id, currentRole._id)
    setSave(true)
  }

  useEffect(() => {
    getPostById(id)
  }, [id])

  useEffect(() => {
    getBasicData(post)
  }, [post])

  return (
    <div className="flex flex-col bg-white rounded p-4 gap-4 shadow-md">
      {/* title */}
      <div className="heading-2">{post?.title}</div>

      {/* image */}
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
        <Button label={'Ứng tuyển'} className="flex-1" onClick={handleApply} />
        <Button
          label={'Xem công ty'}
          onClick={() =>
            navigate(`/company/${post?.authorType}/${post?.author}`)
          }
        />
        <Button
          label={'Theo dõi'}
          className="bg-second text-black"
          onClick={() =>
            handleSavePost(post?._id)
          }
        />
      </div>

      <Line />
      {/* infos */}
      <div className="grid grid-cols-2 grid-flow-row gap-2">
        <span className="flex flex-row items-center gap-2">
          <LuCircleDollarSign size={24} />
          <span>{new Intl.NumberFormat('de-DE').format(post?.salary)} vnđ</span> 
        </span>

        <span className="flex flex-row items-center gap-2">
          <IoMdPeople size={24} />
          <span>{post?.quantity} người</span>
        </span>

        <span className="flex flex-row items-center gap-2">
          <IoLocationOutline size={24} />
          <span>{`${basicInfo?.address?.province?.name}, ${basicInfo?.address?.district?.name}`}</span>
        </span>

        <span>
          <PiBagBold size={24} />
        </span>
      </div>

      {/* skills */}
      <div className="flex-row-center gap-2">
        <span className="para-1">Yêu cầu kỹ năng : </span>
        <div className="flex-row-center gap-2">
          {post?.skills?.map((skill) => (
            <Tag key={skill?.value} label={skill?.name} />
          ))}
        </div>
      </div>
      <Line />

      {/* description */}
      <div className="flex flex-col gap-2">
        <span className="heading-3">Mô tả công việc:</span>
        <div
          dangerouslySetInnerHTML={{
            __html: post?.desc
          }}
        ></div>
      </div>

      <Line />
      {/* work requirement */}
      <div className="flex flex-col gap-2">
        <span className="heading-3">Yêu cầu công việc:</span>
        <div
          dangerouslySetInnerHTML={{
            __html: post?.request
          }}
        ></div>
      </div>
      <Line />

      {/* company's info */}
      <div className="grid grid-cols-3 grid-flow-row gap-2">
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
  )
}

export default PostDetails
