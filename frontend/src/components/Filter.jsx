import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Dropdown, Button, Tag, RangeSlider, Line } from './'

const Filter = (props) => {
  const {
    tags,
    setTags,
    skillsstatic,
    addressstatic,
    skillSelected,
    setSkillSelected,
    address,
    setAddress,
    salarys,
    setSalarys,
    skills,
    setSkills
  } = props
  const { currentRole } = useSelector((state) => state.app)

  useEffect(() => {
    if (currentRole?.target) {
      const { skills, target_money, types, address, wforms } =
        currentRole.target

      // Update the state based on the current role's target
      setSkills(skills || [])
      setSalarys([target_money?.min_money || 0, target_money?.max_money || 100])
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
  return (
    <div className="flex flex-col rounded p-4 gap-4 w-full border border-black-100 bg-white">
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
                  skills.length < 5 &&
                  !skills.some((skill) => skill.value === skillSelected.value)
                ) {
                  setSkills((prev) => [...prev, skillSelected])
                }
              }}
            />
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <span className="para-1 py-2">{skills.length}/5 kỹ năng : </span>
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
              key={tag.value}
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
              key={tag.value}
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
  )
}

export default Filter
