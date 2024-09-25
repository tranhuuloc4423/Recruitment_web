import React, { useState } from 'react'
import info from '../utils/infos'
import Input from '../components/Input'
import Line from '../components/Line'
import { IoClose } from 'react-icons/io5'
import Button from '../components/Button'
import Avatar from '../components/Avatar'
import { convertFileToURL, convertToBase64 } from '../utils/functions'
import { useSelector, useDispatch } from 'react-redux'
import { getById, updateBasicInfo } from '../redux/api/app'

const BasicInfoForm = ({ open, setOpen, onUpdate }) => {
  const { currentUser } = useSelector((state) => state.auth)
  const { basicInfo } = info.find((info) => info.name === currentUser?.role)
  const dispatch = useDispatch()
  const [image, setImage] = useState(null)
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    dob: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!image) {
      return
    }
    // kiểm tra xem có dữ liệu nào còn thiếu nếu thiếu return
    const valuesCheck = Object.values(values).find(
      (value) => value.trim() === ''
    )
    if (valuesCheck) {
      return
    }

    // covert ảnh
    // const imagebs64 = await convertToBase64(image)
    const imgUrl = await convertFileToURL(image)
    // const basic_info = { ...values, image: imagebs64 }
    // updateBasicInfo(currentUser.id, { basic_info }, dispatch, currentUser.role)
    // getById(currentUser.id, dispatch, currentUser.role)
    // onUpdate(values)
    console.log(URL.createObjectURL(image))
    setOpen(false)
  }

  return (
    <div
      className="fixed bg-overlay inset-0 flex justify-center items-center w-full"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-white rounded p-4 flex flex-col gap-4 w-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row items-center justify-between">
          <span className="heading-3">Thông tin cơ bản</span>
          <span>
            <IoClose
              size={32}
              color="black"
              onClick={() => setOpen(false)}
              className="cursor-pointer"
            />
          </span>
        </div>
        <Line />
        <Avatar file={image} setFile={setImage} />
        <div className="flex gap-2">
          {basicInfo.slice(0, 2).map((item, index) => (
            <Input
              {...item}
              key={index}
              className="flex-1"
              name={item.name}
              value={values[item.name]}
              setValues={handleChange}
              onChange={handleChange}
            />
          ))}
        </div>
        <div className="flex gap-2">
          {basicInfo.slice(2, 4).map((item, index) => (
            <Input
              {...item}
              key={index}
              className="flex-1"
              name={item.name}
              value={values[item.name]}
              setValues={handleChange}
              onChange={handleChange}
            />
          ))}
        </div>
        <div className="flex gap-2">
          {basicInfo.slice(4, 6).map((item, index) => (
            <Input
              {...item}
              key={index}
              className="flex-1"
              name={item.name}
              value={values[item.name]}
              onChange={handleChange}
            />
          ))}
        </div>
        {basicInfo.slice(6, 7).map((item, index) => (
          <Input
            {...item}
            key={index}
            className="flex-1"
            name={item.name}
            value={values[item.name]}
            setValues={handleChange}
            onChange={handleChange}
          />
        ))}
        <Line />
        <div className="w-full">
          <Button label={'Lưu'} onClick={(e) => handleSubmit(e)} />
        </div>
      </div>
    </div>
  )
}

export default BasicInfoForm
