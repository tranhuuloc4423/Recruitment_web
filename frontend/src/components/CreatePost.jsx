import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Input, RichText, Tag, UploadImages } from './'
import { jobDescription, jobRequirements } from '../utils/RichTextTemplate'
import { useSelector } from 'react-redux'
import { createPost } from '../redux/api/post'
import { useLocation } from 'react-router-dom'
import { formatDate } from '../utils/functions'
import DateTimePicker from './DateTimePicker'

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
    salary:
      (updateSalary && new Intl.NumberFormat('de-DE').format(updateSalary)) ||
      '',
    quantity: updateQuantity || '',
    desc: updateDesc || '',
    request: updateRequest || ''
  })
  const [update, setUpdate] = useState(false)
  const [date, setDate] = useState(updateDate || null)
  const [skillSelected, setSkillSelected] = useState(null)
  const [skills, setSkills] = useState(skillsUpdate || [])

  const HandleOnChange = (e) => {
    const { name, value } = e.target

    // Kiểm tra nếu trường là 'salary'
    if (name === 'salary') {
      if (/^\d*\.?\d*$/.test(value)) {
        // Loại bỏ dấu chấm nếu có để chỉ giữ lại số
        const numericValue = value.replace(/\./g, '')

        // Định dạng lại số với dấu chấm mỗi 3 chữ số
        const formattedValue = new Intl.NumberFormat('de-DE').format(
          numericValue
        )

        // Cập nhật giá trị đã định dạng vào state
        setValues((prevValues) => ({
          ...prevValues,
          [name]: formattedValue
        }))
      }
    } else if (name === 'quantity') {
      // Chỉ cho phép giá trị số hoặc rỗng cho 'quantity'
      if (/^\d*\.?\d*$/.test(value) || value === '') {
        setValues((prevValues) => ({
          ...prevValues,
          [name]: value
        }))
      }
    } else {
      // Các trường khác
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value
      }))
    }
  }

  const handleCreatePost = async () => {
    if (currentUser.role === 'candidate') {
      return
    }

    let data
    data = {
      ...values,
      salary: parseInt(values.salary.replace(/\./g, ''), 10),
      date_expiration: `${date.$D}/${date.$M + 1}/${date.$y}`,
      skills: skills,
      author: currentRole._id,
      authorType: currentUser.role
    }
    console.log(data)
    // createPost(data)
    // setValues({
    //   title: '',
    //   salary: '',
    //   quantity: '',
    //   desc: '',
    //   request: '',
    //   date_expiration: ''
    // })
    setSkills([])
  }

  const handleUpdate = async () => {}

  useEffect(() => {
    if (location.state) {
      setUpdate(true)
    } else {
      setUpdate(false)
    }
  }, [location])

  return (
    <div className="w-[65%] mx-auto bg-white rounded shadow-md flex flex-col gap-2 p-4">
      <div className="text-center heading-2">Đăng Tin</div>
      <Input
        placeholder={'Tiêu đề'}
        required
        name={'title'}
        value={values.title}
        onChange={HandleOnChange}
        label={'Tiêu đề'}
      />
      <Input
        placeholder={'Mức lương'}
        label={'Mức lương'}
        name={'salary'}
        required
        value={values.salary}
        onChange={HandleOnChange}
      />
      <DateTimePicker date={date} setDate={setDate} validDate={true} />
      <Input
        name={'quantity'}
        placeholder={'Số lượng ứng viên'}
        required
        label="Số lượng ứng viên"
        value={values.quantity}
        onChange={HandleOnChange}
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
