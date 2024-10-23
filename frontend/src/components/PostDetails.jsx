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
import { getPost, getRoleData } from '../redux/api/post'

const PostDetails = ({ id }) => {
  const [post, setPost] = useState()
  const [basicInfo, setBasicInfo] = useState()
  const [otherInfo, setOtherInfo] = useState()

  const getBasicData = async (post) => {
    const res = await getRoleData(post?.authorType, post?.author)
    setBasicInfo(res?.basic_info)
    setOtherInfo(res?.other_info)
  }

  const getPostById = async (id) => {
    const res = await getPost(id)
    console.log(res)
    setPost(res)
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
        <Button label={'Ứng tuyển'} className="flex-1" />
        <Button label={'Theo dõi'} />
        <LuHeart size={32} />
      </div>

      <Line />
      {/* infos */}
      <div className="grid grid-cols-2 grid-flow-row gap-2">
        <span className="flex flex-row items-center gap-2">
          <LuCircleDollarSign size={24} />
          <span>{post?.salary} vnđ</span>
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
