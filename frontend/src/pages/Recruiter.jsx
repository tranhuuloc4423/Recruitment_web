import React, { useEffect, useState } from 'react'
import { IoLocationOutline } from 'react-icons/io5'
import { PiBagBold } from 'react-icons/pi'
import { Button, Post } from '../components'
import InfoCardToggle from '../components/InfoCardToggle'
import { useParams } from 'react-router-dom'
import { getAllPostedByOwner, getRoleData } from '../redux/api/post'
import blank_avatar from '../assets/imgs/blank-profile-picture-973460_960_720.png'
import info from '../utils/infos'

const Recruiter = () => {
  const { id, type } = useParams()
  const [basic, setBasic] = useState()
  const [other, setOther] = useState()
  const [posts, setPosts] = useState()

  const getData = async () => {
    const res = await getRoleData(type, id)
    const res2 = await getAllPostedByOwner(id)
    setBasic(res.basic_info)
    setOther(res.other_info)
    setPosts(res2)
  }

  useEffect(() => {
    getData()
    console.log(posts)
  }, [id, type])

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* header */}
      <div className="flex flex-row items-center bg-white shadow-md p-4 rounded w-full gap-4">
        <div className="w-[150px] h-[150px] rounded">
          <img
            className=""
            src={basic?.image?.url || blank_avatar}
            alt="avatar"
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <span className="heading-2 font-bold">{basic?.name}</span>
          <div className="flex flex-row items-center gap-4">
            <div className="flex flex-row items-center gap-2">
              <IoLocationOutline size={24} />
              <span>{basic?.address?.district.name},</span>
              <span>{basic?.address?.province.name}</span>
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
          {/* <InfoCardToggle title={'Thông tin chung'} children={<>Hello</>} />
          <InfoCardToggle title={'Giới thiệu công ty'} children={other?.desc} />
          <InfoCardToggle
            title={'Chuyên môn của chúng tôi'}
            children={<>Hello</>}
          />
          <InfoCardToggle
            title={'Các hình ảnh của công ty'}
            children={<>Hello</>}
          />
          <InfoCardToggle title={'Địa điểm'} children={<>Hello</>} /> */}
          {info
            .find((role) => role.name === type)
            .otherInfo.map((item) => {
              const data = other?.[item?.name]

              return (
                <InfoCardToggle
                  key={item?.name}
                  title={item?.title}
                  children={data}
                />
              )
            })}
        </div>

        {/* company's posst */}
        <div className="w-[30%] flex flex-col gap-4">
          <span className="heading-3">
            {posts?.length} công việc đang tuyển
          </span>
          <div className="flex flex-col gap-2 overflow-scroll">
            {posts?.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recruiter
