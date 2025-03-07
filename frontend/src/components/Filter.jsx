import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown, Button, Tag, RangeSlider, Line } from './'
import DropdownSearch from './DropdownSearch'
import { getById, getTarget } from '../redux/api/app'
import { useLocation } from 'react-router-dom'

const Filter = (props) => {
  const {
    tags,
    setTags,
    skillsStatic,
    addressStatic,
    skillSelected,
    setSkillSelected,
    addressSelected,
    setAddressSelected,
    salarys,
    setSalarys,
    skills,
    setSkills,
    isTarget
  } = props
  const { currentRole } = useSelector((state) => state.app)
  // const { currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    if (currentRole?._id && location.pathname === '/info/target') {
      getTarget(currentRole._id, dispatch)
    }
  }, [location.pathname])

  useEffect(() => {
    if (currentRole?.target) {
      let skills, target_money, types, address, wforms

      if (isTarget) {
        console.log('isTarget is true')
        ;({ skills, target_money, types, address, wforms } = currentRole.target)
      } else {
        console.log('isTarget is false')
        const filterFrame = localStorage.getItem('filterFrame')
        console.log('filterFrame from localStorage:', filterFrame)
        const parsedFrame = filterFrame ? JSON.parse(filterFrame) : {}
        ;({ skills, target_money, types, address, wforms } = parsedFrame)
      }

      // Update the state based on the current role's target
      setSkills(skills || [])
      setSalarys([target_money?.min_money || 0, target_money?.max_money || 100])
      setAddressSelected(address || null)

      // Update the tags based on types and wforms
      setTags((prevTags) => {
        const updatedTags = prevTags.map((tag) => {
          if (
            types?.some((type) => type.value === tag.value) ||
            wforms?.some((wform) => wform.value === tag.value)
          ) {
            return { ...tag, checked: true }
          }
          return { ...tag, checked: false }
        })
        return updatedTags
      })
    }
  }, [currentRole])

  const handleTagChange = (name) => {
    setTags((prevTags) =>
      prevTags.map((tag) =>
        tag.name === name ? { ...tag, checked: !tag.checked } : tag
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
              options={skillsStatic}
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
            {skills.map((item, index) => (
              <Tag
                key={index}
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
              label={tag.name}
              plus
              checked={tag.checked}
              setChecked={() => handleTagChange(tag.name)}
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
              label={tag.name}
              plus
              checked={tag.checked}
              setChecked={() => handleTagChange(tag.name)}
            />
          ))}
        </div>
      </div>
      <Line />
      <div className="flex flex-row justify-between items-center">
        <span className="flex-1 heading-3">Địa điểm</span>
        <div className="flex-1">
          <DropdownSearch
            items={addressStatic}
            selectedItem={addressSelected}
            setSelectedItem={setAddressSelected}
            placeholder={'Địa điểm'}
          />
        </div>
      </div>
    </div>
  )
}

export default Filter
