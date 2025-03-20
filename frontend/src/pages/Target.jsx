import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Tag, RangeSlider, Line } from '../components/'
import { getTarget, updateTarget } from '../redux/api/app'
import { useDispatch, useSelector } from 'react-redux'
import DropdownSearch from '../components/DropdownSearch'

const Target = () => {
  const [skillSelected, setSkillSelected] = useState(null)
  const [addressSelected, setAddressSelected] = useState(null)
  const [salarys, setSalarys] = useState([0, 100])
  const [skills, setSkills] = useState([])
  const [tags, setTags] = useState([
    { name: 'Toàn thời gian', value: 'fulltime', checked: false },
    { name: 'Bán thời gian', value: 'parttime', checked: false },
    { name: 'Tại văn phòng', value: 'onsite', checked: false },
    { name: 'Từ xa', value: 'remote', checked: false },
    { name: 'Linh hoạt', value: 'hybrid', checked: false }
  ])

  const { currentRole, skillsDB } = useSelector((state) => state.app)
  const { address } = useSelector((state) => state.address)
  const dispatch = useDispatch()

  // Load initial data
  useEffect(() => {
    if (currentRole?._id) {
      getTarget(currentRole._id, dispatch)
    }
  }, [currentRole?._id, dispatch])

  // Update local state when Redux store changes
  useEffect(() => {
    if (currentRole?.target) {
      const { skills, target_money, types, address, wforms } = currentRole.target
      
      setSkills(skills || [])
      setSalarys([target_money?.min_money || 0, target_money?.max_money || 100])
      setAddressSelected(address || null)

      setTags(prevTags => prevTags.map(tag => {
        const isChecked = types?.some(t => t.value === tag.value) || 
                        wforms?.some(w => w.value === tag.value)
        return { ...tag, checked: isChecked || false }
      }))
    }
  }, [currentRole?.target])

  const handleTagChange = (name) => {
    setTags(prevTags =>
      prevTags.map(tag =>
        tag.name === name ? { ...tag, checked: !tag.checked } : tag
      )
    )
  }

  const handleSubmit = () => {
    const types = tags
      .slice(0, 2)
      .filter(tag => tag.checked)
      .map(({ checked, ...tag }) => tag)
    const wforms = tags
      .slice(2)
      .filter(tag => tag.checked)
      .map(({ checked, ...tag }) => tag)

    const data = {
      skills: skills,
      target_money: {
        min_money: salarys[0],
        max_money: salarys[1]
      },
      types: types,
      address: addressSelected ? {
        province: {
          name: addressSelected.name,
          code: addressSelected?.code
        }
      } : null,
      wforms: wforms
    }

    updateTarget(currentRole?._id,currentRole.userId, data, dispatch)
  }

  const handleAddSkill = () => {
    if (
      skillSelected &&
      skills.length < 5 &&
      !skills.some(skill => skill.value === skillSelected.value)
    ) {
      setSkills(prev => [...prev, skillSelected])
      setSkillSelected(null)
    }
  }

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col p-4 rounded gap-4 w-full lg:w-2/3">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <span className="heading-2">Công việc mong muốn</span>
          <span className="para-1">
            Chia sẻ loại công việc bạn mong muốn để được giới thiệu cơ hội việc
            làm phù hợp hơn trên trang của chúng tôi.
          </span>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col rounded p-4 gap-4 w-full border border-black-100 bg-white">
          {/* Skills */}
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <span className="flex-1 heading-3">Kỹ năng</span>
              <div className="flex-1 flex flex-row gap-4">
                <Dropdown
                  label={'Kỹ năng'}
                  options={skillsDB}
                  selectedOption={skillSelected}
                  setSelectedOption={setSkillSelected}
                />
                <Button label={'Thêm'} onClick={handleAddSkill} />
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <span className="para-1 py-2">{skills.length}/5 kỹ năng : </span>
              <div className="flex flex-wrap gap-2">
                {skills.map((item, index) => (
                  <Tag
                    key={index}
                    label={item.name}
                    remove={true}
                    onRemove={() =>
                      setSkills(prev =>
                        prev.filter(skill => skill.value !== item.value)
                      )
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          
          <Line />
          
          {/* Salary */}
          <div className="flex flex-row justify-between items-center">
            <span className="flex-1 heading-3">Mức lương</span>
            <div className="flex-1">
              <RangeSlider values={salarys} setValues={setSalarys} />
            </div>
          </div>
          
          <Line />
          
          {/* Work Types */}
          <div className="flex flex-row justify-between items-center">
            <span className="heading-3">Hình thức</span>
            <div className="flex items-center gap-4">
              {tags.slice(0, 2).map(tag => (
                <Tag
                  key={tag.value}
                  label={tag.name}
                  plus
                  checked={tag.checked}
                  setChecked={() => handleTagChange(tag.name)}
                />
              ))}
            </div>
          </div>
          
          <Line />
          
          {/* Work Forms */}
          <div className="flex flex-row justify-between items-center">
            <span className="heading-3">Loại hình</span>
            <div className="flex items-center gap-4">
              {tags.slice(2).map(tag => (
                <Tag
                  key={tag.value}
                  label={tag.name}
                  plus
                  checked={tag.checked}
                  setChecked={() => handleTagChange(tag.name)}
                />
              ))}
            </div>
          </div>
          
          <Line />
          
          {/* Location */}
          <div className="flex flex-row justify-between items-center">
            <span className="flex-1 heading-3">Địa điểm</span>
            <div className="flex-1">
              <DropdownSearch
                items={address}
                selectedItem={addressSelected}
                setSelectedItem={setAddressSelected}
                placeholder={'Địa điểm'}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full">
          <Button label={'Cập nhật'} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  )
}

export default Target