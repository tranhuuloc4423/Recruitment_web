import React, { useEffect, useState, useRef } from 'react'

const DropdownSearch = ({
  items,
  selectedItem,
  setSelectedItem,
  required = false,
  label = '',
  disabled = false,
  placeholder
}) => {
  const [search, setSearch] = useState('')
  const [focus, setFocus] = useState(false)
  const [filteredItems, setFilteredItems] = useState(items)

  const dropdownRef = useRef(null)

  // Sync search state with selectedItem prop when it changes
  useEffect(() => {
    if (selectedItem === null || selectedItem === '') {
      setSearch('')
    } else if (selectedItem?.name) {
      setSearch(selectedItem.name)
    }
  }, [selectedItem])

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearch(value)
    if (value === '' || value === null) {
      setSelectedItem(null)
    }
    const filtered = items?.filter((item) =>
      item?.name.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredItems(filtered)
  }

  const handleSelectItem = (item) => {
    setSearch(item.name)
    setSelectedItem(item)
    setFocus(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFocus(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  useEffect(() => {
    setFilteredItems(items)
  }, [items])

  return (
    <div className="w-full gap-4 relative" ref={dropdownRef}>
      <div className="flex flex-col">
        <div className="flex flex-row gap-1 items-center">
          <span>{label}</span>
          {required && <span className="text-red">*</span>}
        </div>
        <input
          type="text"
          value={search} // Use search directly as the controlled value
          onChange={handleSearchChange}
          onFocus={() => setFocus(true)}
          placeholder={placeholder}
          className="outline-none border-2 px-4 py-2 rounded-md flex-1"
          disabled={disabled}
        />
      </div>

      {focus && (
        <div className="absolute left-0 w-full max-h-40 bg-white rounded shadow-lg overflow-y-auto z-10">
          {filteredItems?.map((item, index) => (
            <div
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelectItem(item)}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DropdownSearch