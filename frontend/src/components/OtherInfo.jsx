import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InfoCard from './InfoCard'
import RichText from './RichText'
import DropdownSearchAdd from './DropdownSearchAdd'
import info from '../utils/infos'
import { updateOtherInfo } from '../redux/api/app'
import UploadImages from './UploadImages'
import { convertFiles } from '../utils/functions'
import { useNavigate } from 'react-router-dom'
import LoadingOverlay from './LoadingOverlay'
const OtherInfo = () => {
  const { currentUser } = useSelector((state) => state.auth)
  const { currentRole, skillsDB } = useSelector((state) => state.app)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    speciality: [],
    types: [],
    wforms: [],
    skills: []
  })
  const [images, setImages] = useState([])
  const [values, setValues] = useState({})

  const [openStates, setOpenStates] = useState({})
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    console.log(skillsDB)
    if (currentUser?.role === 'candidate') {
      setValues((prevValues) => ({
        ...prevValues,
        desc: currentRole?.other_info?.desc || prevValues.desc,
        exps: currentRole?.other_info?.exps || prevValues.exps,
        education: currentRole?.other_info?.education || prevValues.education,
        certificates:
          currentRole?.other_info?.certificates || prevValues.certificates
      }))
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        desc: currentRole?.other_info?.desc || prevValues.desc,
        images: currentRole?.other_info?.images || prevValues.images
      }))
    }
  }, [currentRole.other_info])

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSetTags = (name, tags) => {
    setFormData((prev) => ({ ...prev, [name]: tags }))
  }

  const handleOtherInfo = async (item) => {
    let newValue
    switch (item.type) {
      case 'richText':
        newValue = values[item.name]
        break
      case 'dropdown':
        newValue = formData[item.name]
        break
      case 'images':
        let results = await convertFiles(images)
        newValue = results
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

      forceUpdate((prev) => prev + 1)
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
                    template={item.template}
                    hasImage={item?.hasImage}
                  />
                )}
                {item?.type === 'dropdown' && (
                  <>
                    <div className="flex flex-row gap-4">
                      <DropdownSearchAdd
                        tags={formData[item.name]}
                        setTags={(tags) => handleSetTags(item.name, tags)}
                        items={item?.options || skillsDB}
                      />
                    </div>
                  </>
                )}
                {item.type === 'images' && (
                  <UploadImages files={images} setFiles={setImages} />
                )}
              </>
            }
            item={item}
            onClick={() => handleOtherInfo(item)}
          />
        ))}
    </div>
  )
}

export default OtherInfo
