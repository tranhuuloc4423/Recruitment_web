import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Input, RichText, Tag, UploadImages } from './'
import { jobDescription, jobRequirements } from '../utils/RichTextTemplate'
import { useSelector } from 'react-redux'
import { createPost, updatePost } from '../redux/api/post'
import { useLocation } from 'react-router-dom'
import {
  convertDatetoString,
  convertStringtoDate,
  formatDate
} from '../utils/functions'
import DateTimePicker from './DateTimePicker'
import Slider from './Slider'
import { toast } from 'react-toastify'

const CreatePost = () => {
  const { currentUser } = useSelector((state) => state.auth)
  const { currentRole, skillsDB } = useSelector((state) => state.app)
  const location = useLocation()
  const {
    updateTitle,
    updateSalary,
    updateQuantity,
    updateDesc,
    updateRequest,
    updateDate,
    skillsUpdate
  } = location?.state || {}
  const [values, setValues] = useState({
    title: updateTitle || '',
    desc: updateDesc || '',
    request: updateRequest || ''
  })
  const [update, setUpdate] = useState(false)
  const [date, setDate] = useState(convertStringtoDate(updateDate) || null)
  const [skillSelected, setSkillSelected] = useState(null)
  const [skills, setSkills] = useState(skillsUpdate || [])
  const [salary, setSalary] = useState(parseInt(updateSalary) / 1000000 || 1)
  const [quantity, setQuantity] = useState(updateQuantity || 0)

  const HandleOnChange = (e) => {
    const { name, value } = e.target
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }))
  }

  const handleCreatePost = async () => {
    if (currentRole.profileStatus < 80) {
      toast.error('Vui lòng cập nhật thông tin trước khi đăng tin!')
      return
    }

    if (currentUser.role === 'candidate') {
      return
    }
    if(quantity === 0) {
      toast.error('Vui lòng cập nhật tối thiểu 1 ứng viên!')
      return
    }

    let data
    data = {
      ...values,
      salary: parseInt(salary * 1000000),
      quantity: quantity,
      date_expiration: convertDatetoString(date),
      skills: skills,
      author: currentRole._id,
      authorType: currentUser.role
    }
    console.log(data)
    createPost(data)
    setValues({
      title: '',
      desc: '',
      request: ''
    })
    setSalary(0)
    setQuantity(0)
    setDate(null)
    setSkills([])
  }

  const handleUpdate = async () => {
    let post
    post = {
      ...values,
      salary: parseInt(salary * 1000000),
      quantity: quantity,
      date_expiration: convertDatetoString(date),
      skills: skills,
      author: currentRole._id,
      authorType: currentUser.role
    }
    const data = {
      userId: currentUser._id,
      authorType: currentUser.role,
      updatedPost: post
    }
    updatePost(data, location.state.id)
    setValues({
      title: '',
      desc: '',
      request: ''
    })
    setSalary(0)
    setQuantity(0)
    setDate(null)
    setSkills([])
    setUpdate(false)
  }

  useEffect(() => {
    if (location.state) {
      console.log(location?.state)
      setUpdate(true)
    } else {
      setUpdate(false)
    }
  }, [location])

  return (
    <div className="w-1/2 mx-auto bg-white rounded shadow-md flex flex-col gap-2 p-4">
      <div className="text-center heading-2">Đăng Tin</div>
      <Input
        placeholder={'Tiêu đề'}
        required
        name={'title'}
        value={values.title}
        onChange={HandleOnChange}
        label={'Tiêu đề'}
      />
      <Slider
        value={salary}
        setValue={setSalary}
        step={1}
        label={'Mức Lương'}
      />
      <div>Ngày hết hạn</div>
      <DateTimePicker date={date} setDate={setDate} validDate={true} />
      <Slider
        value={quantity}
        setValue={setQuantity}
        step={1}
        label={'Số lượng ứng viên'}
        max={30}
      />

      <div className="flex flex-row items-center gap-4">
        <div className="flex-1 flex items-center">
          <Dropdown
            label={'Chọn kỹ năng'}
            selectedOption={skillSelected}
            setSelectedOption={setSkillSelected}
            name={'skill'}
            options={skillsDB}
          />
        </div>
        <Button
          label={'Thêm kỹ năng'}
          className="flex-1"
          onClick={() => {
            if (
              skillSelected &&
              skills.length < 5 &&
              !skills.some((skill) => skill.value === skillSelected.value)
            ) {
              setSkills((prev) => [...prev, skillSelected])
            }
          }}
        />
      </div>

      <div className="flex flex-row items-center gap-4 py-4">
        <span>Kỹ năng đã chọn : </span>
        <div className="flex items-center gap-2">
          {skills.map((item) => (
            <Tag
              label={item.name}
              remove={true}
              onRemove={() =>
                setSkills((prev) =>
                  prev.filter((skill) => skill.value !== item.value)
                )
              }
            />
          ))}
        </div>
      </div>

      <RichText
        label={'Mô tả công việc'}
        name="desc"
        value={values.desc}
        onChange={HandleOnChange} // Cập nhật đúng dạng mà HandleOnChange cần
        template={jobDescription}
      />
      <RichText
        label={'Yêu cầu công việc'}
        name="request"
        value={values.request}
        onChange={HandleOnChange}
        template={jobRequirements}
      />

      <div>
        {update ? (
          <Button label={'Cập nhật'} onClick={handleUpdate} />
        ) : (
          <Button label={'Đăng'} onClick={handleCreatePost} />
        )}
      </div>
    </div>
  )
}

export default CreatePost
