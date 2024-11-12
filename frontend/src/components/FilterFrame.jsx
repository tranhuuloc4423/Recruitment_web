import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Filter, Line } from './'
import { LuFilter } from 'react-icons/lu'
import { IoClose } from 'react-icons/io5'
import { toast } from 'react-toastify'

const FilterFrame = ({ isFilter, setIsFilter }) => {
  const [open, setOpen] = useState(false)
  const [skillSelected, setSkillSelected] = useState(null)
  const { currentRole, skillsDB } = useSelector((state) => state.app)
  const { address } = useSelector((state) => state.address)
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

  const handleReset = () => {
    setSkillSelected(null)
    setAddressSelected(null)
    setSkills([])
    setSalarys([0, 100])
    setTags((prev) =>
      prev.map(({ checked, ...rest }) => ({ checked: false, ...rest }))
    )
    localStorage.removeItem('filterFrame')
    setIsFilter(false)
  }

  const handleFilter = () => {
    const types = tags
      .slice(0, 2)
      .filter((tag) => tag.checked)
      .map(({ checked, ...tag }) => tag)
    const wforms = tags
      .slice(2)
      .filter((tag) => tag.checked)
      .map(({ checked, ...tag }) => tag)
    const data = {
      skills: skills,
      target_money: {
        min_money: salarys[0] * 1000000,
        max_money: salarys[1] * 1000000
      },
      types: types,
      address: {
        name: addressSelected.name,
        code: addressSelected?.code
      },
      wforms: wforms
    }
    localStorage.setItem('filterFrame', JSON.stringify(data))
    setIsFilter(true)
    setOpen(false)
  }

  return (
    <div>
      <div>
        <Button
          label={'Bộ lọc'}
          icon={<LuFilter size={24} color="white" />}
          className="border-primary text-black"
          onClick={() => setOpen(true)}
        />
      </div>
      {open && (
        <div className="fixed inset-0 bg-overlay flex flex-col justify-center items-center z-50">
          <div className="w-[800px] bg-white shadow-md rounded">
            <div className="flex flex-row justify-between items-center p-4 w-full">
              <span className="heading-2">Bộ lọc</span>
              <span className="cursor-pointer" onClick={() => setOpen(false)}>
                <IoClose size={32} />
              </span>
            </div>
            <Line />
            <Filter
              skillSelected={skillSelected}
              setSkillSelected={setSkillSelected}
              setSkills={setSkills}
              skills={skills}
              skillsStatic={skillsDB}
              addressStatic={address}
              addressSelected={addressSelected}
              setAddressSelected={setAddressSelected}
              tags={tags}
              setTags={setTags}
              salarys={salarys}
              setSalarys={setSalarys}
              isTarget={false}
            />
            <Line />
            <div className="flex flex-row justify-between items-center p-4">
              <Button label={'Đặt lại'} onClick={handleReset} />
              <Button label={'Áp dụng'} onClick={handleFilter} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterFrame
