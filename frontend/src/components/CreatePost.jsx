import React, { useState } from 'react'
import { Button, Dropdown, Input, RichText, Tag, UploadImages } from './'

const CreatePost = () => {
  const [values, setValues] = useState({
    title: '',
    salary: '',
    desc: '',
    work_require: '',
    time: ''
  })
  const [skillSelected, setSkillSelected] = useState(null)
  const [skills, setSkills] = useState([])
  const [time, setTime] = useState()
  const skillsStatic = [
    {
      value: 'reactjs',
      label: 'ReactJS'
    },
    {
      value: 'vuejs',
      label: 'VueJS'
    },
    {
      value: 'MongoDB',
      label: 'mongodb'
    }
  ]

  const HandleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
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
        name={'time'}
        placeholder={'Thời hạn'}
        required
        label="Thời hạn"
        value={values.time}
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
              label={item.label}
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
      />
      <RichText
        label={'Yêu cầu công việc'}
        name="work_require"
        value={values.work_require}
        onChange={HandleOnChange}
      />

      <UploadImages />

      <div>
        <Button label={'Đăng'} />
      </div>
    </div>
  )
}

export default CreatePost
