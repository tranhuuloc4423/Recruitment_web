import React, { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

const Dropdown = ({ options, label, setSelectedOption, selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleOptionClick = (option) => {
    setSelectedOption(option)
    setIsOpen(false)
  }

  return (
    <div
      onClick={toggleDropdown}
      className="relative w-full border-2 p-2 rounded flex flex-row items-center justify-between select-none bg-white"
    >
      <div className="w-full">{selectedOption?.value || label}</div>
      <IoIosArrowDown />
      <ul
        className={`rounded bg-white absolute border border-black shadow-md max-h-40 overflow-y-scroll top-[100%] z-[1000] left-0 w-full transition-all ${
          isOpen ? 'cursor-pointer' : 'hidden'
        }`}
      >
        {options?.map((option, index) => (
          <li
            key={index}
            onClick={(e) => {
              if (isOpen) {
                handleOptionClick(option)
              }
              e.stopPropagation()
            }}
            className="p-2 hover:bg-gray-200"
          >
            {option.value}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dropdown
