import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InfoCard from './InfoCard'
import RichText from './RichText'
import DropdownSearchAdd from './DropdownSearchAdd'
import info from '../utils/infos'
import { updateOtherInfo } from '../redux/api/app'
import UploadImages from './UploadImages'
import Tag from './Tag'
const OtherInfo = () => {
  const { currentUser } = useSelector((state) => state.auth)
  const { currentRole } = useSelector((state) => state.app)
  const dispatch = useDispatch()
  const [skills, setSkills] = useState([])
  const [values, setValues] = useState({})
  const [openStates, setOpenStates] = useState({})
  const staticSkills = [
    {
      label: 'Java',
      value: 'java'
    },
    {
      label: 'Javascript',
      value: 'javascript'
    },
    {
      label: 'Reactjs',
      value: 'reactjs'
    },
    {
      label: 'Nodejs',
      value: 'nodejs'
    }
  ]

  useEffect(() => {
    if (currentUser?.role === 'candidate') {
      setValues((prevValues) => ({
        ...prevValues,
        desc: currentRole?.other_info?.desc || prevValues.desc,
        exps: currentRole?.other_info?.exps || prevValues.exps,
        education: currentRole?.other_info?.education || prevValues.education,
        certificates:
          currentRole?.other_info?.certificates || prevValues.certificates,
        skills: currentRole?.other_info?.skills || prevValues.skills
      }))
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        desc: currentRole?.other_info?.desc || prevValues.desc,
        speciality:
          currentRole?.other_info?.speciality || prevValues.speciality,
        images: currentRole?.other_info?.images || prevValues.images,
        types: currentRole?.other_info?.types || prevValues.types,
        wforms: currentRole?.other_info?.wforms || prevValues.wforms
      }))
    }
  }, [currentRole, currentUser?.role])

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleOtherInfo = (item) => {
    let newValue
    switch (item.type) {
      case 'richText':
        newValue = values[item.name]
        break
      case 'dropdown':
        newValue = skills
        break
      case 'images':
        newValue = skills
        break
      default:
        break
    }
    updateOtherInfo(
      currentRole?._id,
      { [item.name]: newValue },
      dispatch,
      currentUser.role
    ).then(() => {
      setValues((prev) => ({
        ...prev,
        [item.name]: newValue
      }))

      setOpenStates((prev) => ({
        ...prev,
        [item.id]: false
      }))
    })
  }

  const toggleOpen = (id) => {
    setOpenStates((prev) => ({
      ...prev,
      [id]: !prev[id] // Chuyển đổi trạng thái open của item
    }))
  }

  return (
    <div className="gap-4 w-[70%] flex flex-col">
      {info
        .find((item) => item?.name === currentUser?.role)
        ?.otherInfo?.map((item) => (
          <InfoCard
            key={item.id}
            title={item.title}
            desc={item.desc}
            value={values[item?.name]}
            open={openStates[item.id] || false}
            setOpen={() => toggleOpen(item.id)}
            children={
              <>
                {item?.type === 'richText' && (
                  <RichText
                    label={item.title}
                    value={values[item?.name]}
                    onChange={onChange}
                    name={item.name}
                  />
                )}
                {item?.type === 'dropdown' && (
                  <>
                    <div className="flex flex-row gap-4">
                      <DropdownSearchAdd
                        tags={skills}
                        setTags={setSkills}
                        items={item.options || staticSkills}
                      />
                    </div>
                  </>
                )}
                {item.type === 'images' && <UploadImages />}
              </>
            }
            infos={
              <>
                {item.type === 'richText' &&
                  item?.name &&
                  currentRole?.other_info?.[item?.name] && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: currentRole?.other_info[item?.name]
                      }}
                    ></div>
                  )}
                {item.type === 'dropdown' &&
                  currentRole?.other_info?.[item.name]?.length > 0 && (
                    <div className="flex flex-row gap-2">
                      {currentRole?.other_info[item?.name]?.map((item) => (
                        <Tag key={item.value} label={item.label} />
                      ))}
                    </div>
                  )}
              </>
            }
            onClick={() => handleOtherInfo(item)}
          />
        ))}
    </div>
  )
}

export default OtherInfo
