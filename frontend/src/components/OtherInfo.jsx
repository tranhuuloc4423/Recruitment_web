import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import InfoCard from './InfoCard'
import RichText from './RichText'
import Input from './Input'
import Button from './Button'
import DropdownSearchAdd from './DropdownSearchAdd'
import info from '../utils/infos'
const OtherInfo = () => {
  const { currentUser } = useSelector((state) => state.auth)
  const { currentRole } = useSelector((state) => state.app)
  const [values, setValues] = useState({
    desc: '',
    exp: '',
    education: '',
    certificates: '',
    skills: '',
    projects: ''
  })

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (currentUser) {
      console.log(currentRole)
    }
  }, [currentUser, currentRole?.other_info])

  return (
    <div className="gap-4 w-[70%] flex flex-col">
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
            onClick={() => console.log({ [item.name]: values[item.name] })}
          />
        ))}
    </div>
  )
}

export default OtherInfo
