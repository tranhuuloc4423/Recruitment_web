import React, { useEffect, useState } from 'react'
import Line from '../components/Line'
import Button from '../components/Button'
import Tag from '../components/Tag'
import Dropdown from '../components/Dropdown'
import RangeSlider from '../components/RangeSlider'
import { updateTarget } from '../redux/api/app'
import { useDispatch, useSelector } from 'react-redux'

const Target = () => {
  const [skillSelected, setSkillSelected] = useState(null)
  const { currentRole } = useSelector((state) => state.app)
  const dispatch = useDispatch()
  const [address, setAddress] = useState(null)
  const [salarys, setSalarys] = useState([0, 100])
  const [skills, setSkills] = useState([])
  const [tags, setTags] = useState([
    { label: 'Toàn thời gian', value: 'fulltime', checked: false },
    { label: 'Bán thời gian', value: 'parttime', checked: false },
    { label: 'Tại văn phòng', value: 'onsite', checked: false },
    { label: 'Từ xa', value: 'remote', checked: false },
    { label: 'Linh hoạt', value: 'hybrid', checked: false }
  ])
  const skillsstatic = [
    { value: 'reactjs', label: 'ReactJS' },
    { value: 'vuejs', label: 'VueJS' },
    { value: 'mongodb', label: 'MongoDB' },
    { value: 'angular', label: 'Angular' }
  ]
  const addressstatic = [
    { value: 'hochiminh', label: 'Tp Hồ Chí Minh' },
    { value: 'hanoi', label: 'Hà Nội' },
    { value: 'binhduong', label: 'Bình Dương' },
    { value: 'dongnai', label: 'Đồng Nai' }
  ]

  useEffect(() => {
    if (currentRole?.target) {
      const { skills, target_money, types, address, wforms } =
        currentRole.target

      // Update the state based on the current role's target
      setSkills(skills || [])
      setSalarys([target_money.min_money, target_money.max_money])
      setAddress(address || null)

      // Update the tags based on types and wforms
      setTags((prevTags) => {
        const updatedTags = prevTags.map((tag) => {
          if (
            types.some((type) => type.value === tag.value) ||
            wforms.some((wform) => wform.value === tag.value)
          ) {
            return { ...tag, checked: true }
          }
          return { ...tag, checked: false }
        })
        return updatedTags
      })
    }
  }, [currentRole])

  const handleTagChange = (label) => {
    setTags((prevTags) =>
      prevTags.map((tag) =>
        tag.label === label ? { ...tag, checked: !tag.checked } : tag
      )
    )
  }

  const handleSubmit = () => {
    const types = tags
      .slice(0, 2)
      .filter((tag) => tag.checked)
      .map(({ checked, ...tag }) => tag)
    const wforms = tags
      .slice(2)
      .filter((tag) => tag.checked)
      .map(({ checked, ...tag }) => tag)

    const data = {
      target: {
        skills: skills,
        target_money: {
          min_money: salarys[0],
          max_money: salarys[1]
        },
        types: types,
        address: address,
        wforms: wforms
      }
    }

    updateTarget(currentRole._id, data, dispatch)

    setSkills(skills)
    setSalarys(salarys)
    setTags(tags)
    setAddress(address)
    console.log(data)
  }

  useEffect(() => {}, [])

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col p-4 rounded gap-2 w-2/3">
        <div className="flex flex-col gap-2">
          <span className="heading-2">Công việc mong muốn</span>
          <span className="para-1">
            Chia sẻ loại công việc bạn mong muốn để được giới thiệu cơ hội việc
            làm phù hợp hơn trên trang của chúng tôi.
          </span>
        </div>
        <div className="flex flex-col border border-black rounded p-4 gap-4">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <span className="flex-1 heading-3">Kỹ năng</span>
              <div className="flex-1 flex flex-row gap-4">
                <Dropdown
                  label={'Kỹ năng'}
                  options={skillsstatic}
                  selectedOption={skillSelected}
                  setSelectedOption={setSkillSelected}
                />
                <Button
                  label={'Thêm'}
                  onClick={() => {
                    if (
                      skillSelected &&
                      !skills.some(
                        (skill) => skill.value === skillSelected.value
                      )
                    ) {
                      setSkills((prev) => [...prev, skillSelected])
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <span className="para-1 py-2">0/5 kỹ năng : </span>
              <div className="flex flex-wrap gap-2">
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
          </div>
          <Line />
          <div className="flex flex-row justify-between items-center">
            <span className="flex-1 heading-3">Mức lương</span>
            <div className="flex-1">
              <RangeSlider values={salarys} setValues={setSalarys} />
            </div>
          </div>
          <Line />
          <div className="flex flex-row justify-between items-center">
            <span className="heading-3">Hình thức</span>
            <div className="flex items-center gap-4">
              {tags.slice(0, 2).map((tag) => (
                <Tag
                  label={tag.label}
                  plus
                  checked={tag.checked}
                  setChecked={() => handleTagChange(tag.label)}
                />
              ))}
            </div>
          </div>
          <Line />
          <div className="flex flex-row justify-between items-center">
            <span className="heading-3">Loại hình</span>
            <div className="flex items-center gap-4">
              {tags.slice(2).map((tag) => (
                <Tag
                  label={tag.label}
                  plus
                  checked={tag.checked}
                  setChecked={() => handleTagChange(tag.label)}
                />
              ))}
            </div>
          </div>
          <Line />
          <div className="flex flex-row justify-between items-center">
            <span className="flex-1 heading-3">Địa điểm</span>
            <div className="flex-1">
              <Dropdown
                label={'Địa điểm'}
                options={addressstatic}
                selectedOption={address}
                setSelectedOption={setAddress}
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button label={'Cập nhật'} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  )
}

export default Target
