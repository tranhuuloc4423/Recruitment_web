import React, { useState } from 'react'
import Address from './Address'
import RangeSlider from './RangeSlider'
import DropdownSearchAdd from './DropdownSearchAdd'
import { useSelector } from 'react-redux'
import DropdownSearch from './DropdownSearch'
import Dropdown from './Dropdown'
import Button from './Button'

const FilterBar = ({ onApplyFilter }) => {
  const { currentRole, skillsDB } = useSelector((state) => state.app)
  const { address } = useSelector((state) => state.address)

  const [skillSelected, setSkillSelected] = useState(null)
  const [addressSelected, setAddressSelected] = useState(null)
  const [salarys, setSalarys] = useState([0, 100])
  const [typeSelected, setTypeSelected] = useState(null)
  const [wformSelected, setWformSelected] = useState(null)
  const types = [
    { name: 'Toàn thời gian', value: 'fulltime' },
    { name: 'Bán thời gian', value: 'parttime' }
  ]
  const wforms = [
    { name: 'Tại văn phòng', value: 'onsite' },
    { name: 'Từ xa', value: 'remote' },
    { name: 'Linh hoạt', value: 'hybrid' }
  ]

  const handleApply = () => {
    const filter = {
      // Giả sử addressSelected chứa đối tượng có thuộc tính code
      address: addressSelected ? { code: addressSelected.code || addressSelected.value || addressSelected } : null,
      // Nếu có kỹ năng được chọn, ta sẽ đưa vào mảng (có thể chỉnh lại nếu cho phép chọn nhiều kỹ năng)
      skills: skillSelected ? [skillSelected] : [],
      // Range slider trả về mảng 2 giá trị [min, max]
      target_money: salarys ? { min_money: salarys[0], max_money: salarys[1] } : null,
      // type và wform sẽ được bổ sung sau
    }

    localStorage.setItem('filterFrame', JSON.stringify(filter))
    if (onApplyFilter) {
      onApplyFilter()
    }
  }

  const handleReset = () => {
    setSkillSelected(null)
    setAddressSelected(null)
    setSalarys([0, 100])
    setTypeSelected(null)
    setWformSelected(null)
    localStorage.removeItem('filterFrame')
    if (onApplyFilter) {
      onApplyFilter()
    }
  }

  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <DropdownSearch
          items={skillsDB}
          selectedItem={skillSelected}
          setSelectedItem={setSkillSelected}
          placeholder={'Kỹ năng'}
        />
        <RangeSlider values={salarys} setValues={setSalarys} isLabel={true} />

        <Dropdown
          label={'Hình thức'}
          options={types}
          setSelectedOption={setTypeSelected}
          selectedOption={typeSelected}
        />
        <Dropdown
          label={'Loại hình'}
          options={wforms}
          setSelectedOption={setWformSelected}
          selectedOption={wformSelected}
        />
        <DropdownSearch
          items={address}
          selectedItem={addressSelected}
          setSelectedItem={setAddressSelected}
          placeholder={'Địa điểm'}
        />
        <div className='flex items-center gap-2 flex-wrap'>
        <Button label={'Áp dụng'} onClick={handleApply} />
        <Button label={'Đặt lại'} onClick={handleReset} />
        </div>
      </div>
    </div>
  )
}

export default FilterBar
