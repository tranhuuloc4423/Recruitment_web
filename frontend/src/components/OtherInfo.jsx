import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InfoCard from './InfoCard'
import RichText from './RichText'
import DropdownSearchAdd from './DropdownSearchAdd'
import info from '../utils/infos'
import { updateOtherInfo } from '../redux/api/app'
const OtherInfo = () => {
  const { currentUser } = useSelector((state) => state.auth)
  const { currentRole } = useSelector((state) => state.app)
  const dispatch = useDispatch()
  const [skills, setSkills] = useState([])
  const [values, setValues] = useState(
    currentUser.role === 'candidate'
      ? {
          desc: '',
          exp: '',
          education: '',
          certificates: '',
          skills: '',
          projects: ''
        }
      : {
          desc: '',
          speciality: '',
          images: ''
        }
  )

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleOtherInfo = (item) => {
    if (item.type === 'richText') {
      updateOtherInfo(
        currentRole?._id,
        { [item.name]: values[item.name] },
        dispatch,
        currentUser.role
      )
    } else if (item.type === 'dropdown') {
      updateOtherInfo(
        currentRole?._id,
        { [item.name]: skills },
        dispatch,
        currentUser.role
      )
    }
  }

  useEffect(() => {
    if (currentUser) {
      console.log(currentRole)
    }
  }, [currentUser, currentRole])

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
                    <DropdownSearchAdd tags={skills} setTags={setSkills} />
                  </div>
                </>
              )
            }
            onClick={() => handleOtherInfo(item)}
          />
        ))}
    </div>
  )
}

export default OtherInfo
