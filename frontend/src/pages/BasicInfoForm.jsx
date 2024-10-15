import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateBasicInfo } from '../redux/api/app'
import { convertFile } from '../utils/functions'
import Avatar from '../components/Avatar'
import Input from '../components/Input'
import Button from '../components/Button'
import Line from '../components/Line'
import { IoClose } from 'react-icons/io5'
import Dropdown from '../components/Dropdown'
import info from '../utils/infos'

const BasicInfoForm = ({ open, setOpen }) => {
  const { currentUser } = useSelector((state) => state.auth)
  const { currentRole } = useSelector((state) => state.app)
  const { basicInfo } = info.find((info) => info.name === currentUser?.role)
  const dispatch = useDispatch()
  const [image, setImage] = useState(null)
  const [values, setValues] = useState({})
  const [gender, setGender] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prevValues) => ({ ...prevValues, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!image) return
    const valuesCheck = Object.values(values).find(
      (value) => value.trim() === ''
    )
    if (valuesCheck) return
    const imagebs64 = await convertFile(image)
    let data

    currentUser.role === 'candidate'
      ? (data = { ...values, gender: gender.value, image: imagebs64 })
      : (data = { ...values, image: imagebs64 })

    // console.log(image)
    updateBasicInfo(currentRole._id, data, dispatch, currentUser.role)
    // getById(currentUser._id, dispatch, currentUser.role)
    setOpen(false)
  }

  return (
    <div className="fixed bg-overlay inset-0 flex justify-center items-center w-full">
      <div
        className="bg-white rounded p-4 flex flex-col gap-4 w-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row items-center justify-between">
          <span className="heading-3">Thông tin cơ bản</span>
          <IoClose
            size={32}
            color="black"
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          />
        </div>
        <Line />
        <Avatar file={image} setFile={setImage} />
        {basicInfo.map((item, index) => {
          if (item.name === 'gender') {
            return (
              <Dropdown
                key={index}
                label={item.label}
                options={item.options}
                selectedOption={gender}
                setSelectedOption={setGender}
              />
            )
          }
          return (
            <Input
              key={index}
              className="flex-1"
              {...item}
              name={item.name}
              value={values[item.name]}
              onChange={handleChange}
            />
          )
        })}
        <Line />
        <Button label="Lưu" onClick={handleSubmit} />
      </div>
    </div>
  )
}

export default BasicInfoForm
