import React from 'react'
import Dropdown from './Dropdown'

const FilterRowBar = (props) => {
  const { title, label, options, setSelectedOption, selectedOption } = props
  return (
    <div className="flex flex-row justify-between w-full items-center">
      <div className="text-xl font-semibold">{title}</div>
      <div className="flex flex-row items-center gap-2">
        <div className="text-nowrap">Sắp xếp theo : </div>
        <Dropdown
          label={label}
          options={options}
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
        />
      </div>
    </div>
  )
}

export default FilterRowBar
