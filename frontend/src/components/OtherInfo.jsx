import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import InfoCard from './InfoCard'
import RichText from './RichText'
import Input from './Input'
import Button from './Button'
import DropdownSearchAdd from './DropdownSearchAdd'
import info from '../utils/infos'
const OtherInfo = () => {
  const { currentUser } = useSelector((state) => state.auth)
  const { recruiter } = useSelector((state) => state.recruiter)
  const { admin } = useSelector((state) => state.admin)
  const { candidate } = useSelector((state) => state.candidate)
  const [values, setValues] = useState({
    introduce: '',
    exp: '',
    education: '',
    certificates: '',
    skills: '',
    projects: ''
  })

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {info
        .find((item) => item?.name === currentUser?.role)
        ?.otherInfo.map((item) => (
          <InfoCard
            key={item.id}
            title={item.title}
            desc={item.desc}
            children={
              item?.type === 'richText' ? (
                <RichText
                  label={item.title}
                  value={values[item?.name]}
                  onChange={onChange}
                  name={item.name}
                />
              ) : (
                <>
                  <div className="flex flex-row gap-4">
                    <DropdownSearchAdd />
                  </div>
                </>
              )
            }
            onClick={() => console.log(values[item.name])}
          />
        ))}
    </div>
  )
}

export default OtherInfo
