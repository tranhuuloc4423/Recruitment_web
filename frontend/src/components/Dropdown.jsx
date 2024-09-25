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
      <div className="w-full">{selectedOption?.label}</div>
      <IoIosArrowDown />
      <ul
        className={`rounded bg-white absolute shadow-md top-[100%] left-0 w-full transition-all ${
          isOpen ? 'translate-y-0' : '-translate-y-10 opacity-0'
        }`}
      >
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleOptionClick(option)}
            className="p-2 cursor-pointer hover:bg-gray-200"
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dropdown
