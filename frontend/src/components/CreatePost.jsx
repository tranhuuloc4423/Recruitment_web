import React, { useState } from 'react'
import { Button, Dropdown, Input, RichText, Tag, UploadImages } from './'
import { jobDescription, jobRequirements } from '../utils/RichTextTemplate'
import { useSelector } from 'react-redux'
import { convertFile, convertFiles } from '../utils/functions'

const CreatePost = () => {
  const { currentUser } = useSelector((state) => state.auth)
  const { currentRole } = useSelector((state) => state.app)
  const [values, setValues] = useState({
    title: '',
    salary: '',
    quantity: '',
    desc: '',
    work_require: '',
    date_expiration: ''
  })
  const [skillSelected, setSkillSelected] = useState(null)
  const [skills, setSkills] = useState([])
  const [images, setImages] = useState([])
  const skillsStatic = [
    {
      value: 'reactjs',
      name: 'ReactJS'
    },
    {
      value: 'vuejs',
      name: 'VueJS'
    },
    {
      value: 'MongoDB',
      name: 'mongodb'
    }
  ]

  const HandleOnChange = (e) => {
    const { name, value } = e.target

    if (name === 'salary') {
      if (/^\d*\.?\d*$/.test(value) || value === '') {
        setValues((prevValues) => ({
          ...prevValues,
          [name]: value
        }))
      }
    } else {
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
    const imagesConvert = await convertFiles(images)
    let data
    data = {
      ...values,
      images: imagesConvert,
      skills: skills,
      userId: currentRole._id,
      userType: currentUser.role
    }
    console.log(data)
  }

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
      <Input
        type={'date'}
        name={'date_expiration'}
        placeholder={'Thời hạn'}
        required
        label="Thời hạn"
        value={values.date_expiration}
        onChange={HandleOnChange}
      />
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
            options={skillsStatic}
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
        name="work_require"
        value={values.work_require}
        onChange={HandleOnChange}
        template={jobRequirements}
      />

      <UploadImages files={images} setFiles={setImages} />

      <div>
        <Button label={'Đăng'} onClick={handleCreatePost} />
      </div>
    </div>
  )
}

export default CreatePost
