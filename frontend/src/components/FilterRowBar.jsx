import React, { useEffect } from 'react'
import Dropdown from './Dropdown'
import { IoIosArrowDown } from 'react-icons/io'

const FilterRowBar = ({ title, filter, onChange }) => {
  useEffect(() => {
    console.log(filter)
  }, [filter])
  return (
    <div className="flex flex-row flex-wrap gap-4 py-2 w-full items-center">
      <div className="text-xl font-semibold">{title}</div>
      <div className="flex flex-row items-center gap-2">
        {filter?.map((item, index) => (
          <div
            key={index}
            className="flex flex-row items-center gap-2 border border-black-100 px-2 py-1 rounded cursor-pointer"
            onClick={() => onChange(index)}
          >
            <span className="text-lg">{item.label}</span>
            <IoIosArrowDown
              size={24}
              className={`${item.increase ? 'rotate-180' : 'rotate-0'}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FilterRowBar
