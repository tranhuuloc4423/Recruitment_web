import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAddress, updateBasicInfo } from '../redux/api/app'
import { convertFile } from '../utils/functions'
import Avatar from '../components/Avatar'
import Input from '../components/Input'
import Button from '../components/Button'
import Line from '../components/Line'
import { IoClose } from 'react-icons/io5'
import Dropdown from '../components/Dropdown'
import info from '../utils/infos'
import Address from '../components/Address'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const BasicInfoForm = ({ open, setOpen }) => {
  const { currentUser } = useSelector((state) => state.auth)
  const { currentRole } = useSelector((state) => state.app)
  const { address } = useSelector((state) => state.address)
  const { basicInfo } = info.find((info) => info.name === currentUser?.role)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [image, setImage] = useState(null)
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [gender, setGender] = useState('')

  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)
  const inputs = info.find((info) => info.name === currentUser?.role).basicInfo

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prevValues) => ({ ...prevValues, [name]: value }))

    const input = inputs.find((input) => input.name === name)
    if (input?.pattern && !input.pattern.test(value)) {
      setErrors({ ...errors, [name]: input.error })
    } else {
      const { [name]: removedError, ...rest } = errors
      setErrors(rest)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    let formIsValid = true
    const newErrors = {}

    inputs.forEach((input) => {
      const value = values[input.name]

      if (input.required && !value) {
        newErrors[input.name] = `${input.label} là bắt buộc.`
        formIsValid = false
      } else if (input.pattern && !input.pattern.test(value)) {
        newErrors[input.name] = input.error
        formIsValid = false
      } else if (input.validate && !input.validate(value, values)) {
        newErrors[input.name] = input.error
        formIsValid = false
      }
    })
    setErrors(newErrors)

    if (formIsValid) {
      if (!image) {
        return
      }
      const valuesCheck = Object.values(values).find(
        (value) => value.trim() === ''
      )
      if (valuesCheck) return
      if (!selectedProvince) return
      if (!selectedCity) return
      const imagebs64 = await convertFile(image)
      let data
      let additionalData = {
        image: imagebs64,
        address: {
          province: { name: selectedProvince.name },
          district: { name: selectedCity.name }
        }
      }

      currentUser.role === 'candidate'
        ? (data = {
            ...values,
            gender,
            ...additionalData
          })
        : (data = {
            ...values,
            ...additionalData
          })
      // console.log(data)
      console.log(currentRole.basic_info)
      updateBasicInfo(currentRole._id, data, dispatch, currentUser.role)
      console.log(currentRole.basic_info)
      setOpen(false)
    } else {
      toast.warn('Vui lòng nhập thông tin hợp lệ')
    }
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

        <div className="w-full flex flex-col gap-2">
          {basicInfo.map((item, index) => {
            if (index % 2 === 0) {
              return (
                <div key={index} className="flex gap-4">
                  {' '}
                  {basicInfo
                    .slice(index, index + 2)
                    .map((subItem, subIndex) => {
                      if (subItem.name === 'gender') {
                        return (
                          <Dropdown
                            key={index + subIndex}
                            label={subItem.label}
                            options={subItem.options}
                            selectedOption={gender}
                            setSelectedOption={setGender}
                          />
                        )
                      }
                      return (
                        <Input
                          key={index + subIndex}
                          className="flex-1"
                          {...subItem}
                          name={subItem.name}
                          value={values[subItem.name]}
                          onChange={handleChange}
                          error={errors[subItem.name]}
                        />
                      )
                    })}
                </div>
              )
            }
            return null
          })}
          <Address
            provincesData={address}
            selectedProvince={selectedProvince}
            selectedCity={selectedCity}
            setSelectedProvince={setSelectedProvince}
            setSelectedCity={setSelectedCity}
          />
        </div>

        <Line />
        <Button label="Lưu" onClick={handleSubmit} />
      </div>
    </div>
  )
}

export default BasicInfoForm
