import React, { useState, useEffect, useRef } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

const Dropdown = ({ options, label, setSelectedOption, selectedOption, className = null }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null) // Ref để tham chiếu đến dropdown

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleOptionClick = (option) => {
    setSelectedOption(option)
    setIsOpen(false)
  }

  // Đóng dropdown khi nhấp ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    // Gắn sự kiện mousedown vào document
    document.addEventListener('mousedown', handleClickOutside)

    // Cleanup sự kiện khi component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  return (
    <div
      ref={dropdownRef} // Gắn ref vào div chính của dropdown
      onClick={toggleDropdown}
      className={`relative w-full h-fit border-2 p-2 rounded flex flex-row items-center justify-between select-none bg-white ${className}`}
    >
      <div className="w-full">{selectedOption?.name || label}</div>
      <IoIosArrowDown />
      <ul
        className={`rounded bg-white absolute border border-gray-100 shadow-md max-h-40 overflow-y-auto top-[100%] z-[1000] left-0 w-full transition-all ${
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
              e.stopPropagation() // Ngăn sự kiện bubbling
            }}
            className="p-2 hover:bg-gray-200"
            value={option.value}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dropdown