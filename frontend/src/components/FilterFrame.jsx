import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Filter, Line } from './'
import { LuFilter } from 'react-icons/lu'
import { IoClose } from 'react-icons/io5'

const FilterFrame = () => {
  const [open, setOpen] = useState(false)
  const [skillSelected, setSkillSelected] = useState(null)
  // const { currentRole } = useSelector((state) => state.app)
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
    { value: 'angular', label: 'Angular' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' }
  ]
  const addressstatic = [
    { value: 'hochiminh', label: 'Tp Hồ Chí Minh' },
    { value: 'hanoi', label: 'Hà Nội' },
    { value: 'binhduong', label: 'Bình Dương' },
    { value: 'dongnai', label: 'Đồng Nai' }
  ]

  const handleReset = () => {
    setSkillSelected(null)
    setAddress(null)
    setSkills([])
    setSalarys([0, 100])
    setTags((prev) =>
      prev.map(({ checked, ...rest }) => ({ checked: false, ...rest }))
    )
  }

  const handleFilter = () => {}

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
        <div className="fixed inset-0 bg-overlay flex flex-col justify-center items-center">
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
              skillsstatic={skillsstatic}
              addressstatic={addressstatic}
              address={address}
              setAddress={setAddress}
              tags={tags}
              setTags={setTags}
              salarys={salarys}
              setSalarys={setSalarys}
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
