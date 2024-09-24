import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import InfoCard from './InfoCard'
import RichText from './RichText'
import Input from './Input'

const form = {
  admin: [],
  recruiter: [],
  candidate: [
    {
      title: 'Giới thiệu bản thân',
      desc: 'Thông tin cá nhân của bạn.',
      type: 'richText',
      id: 1,
      name: 'introduce'
    },
    {
      title: 'Kinh nghiệm',
      desc: 'Thông tin về kinh nghiệm làm việc.',
      type: 'richText',
      id: 2,
      name: 'exp'
    },
    {
      title: 'Kỹ năng',
      desc: 'Thông tin về kinh nghiệm làm việc.',
      type: 'input',
      id: 3,
      name: 'skills'
    },
    {
      title: 'Học vấn',
      desc: 'Thông tin học vấn và bằng cấp.',
      type: 'richText',
      id: 1,
      name: 'education'
    },
    {
      title: 'Dự án cá nhân',
      desc: 'Dự án bạn đã thực hiện.',
      type: 'richText',
      id: 1,
      name: 'projects'
    },
    {
      title: 'Chứng chỉ',
      desc: 'Thông tin về chứng chỉ đã đạt được.',
      type: 'richText',
      id: 1,
      name: 'certificates'
    }
  ]
}
const OtherInfo = () => {
  const { currentUser } = useSelector((state) => state.auth)
  const { recruiter } = useSelector((state) => state.recruiter)
  const { admin } = useSelector((state) => state.admin)
  const { candidate } = useSelector((state) => state.candidate)
  const [values, setValues] = useState({})
  return (
    <div className="w-full flex flex-col gap-4">
      {/* <InfoCard
        title="Giới thiệu bản thân"
        desc="Giới thiệu thông tin bản thân, điểm mạnh, ..."
        children={
          <RichText
            label={'Giới thiệu bản thân'}
            value={value}
            onChange={setValue}
          />
        }
      /> */}
    </div>
  )
}

export default OtherInfo
