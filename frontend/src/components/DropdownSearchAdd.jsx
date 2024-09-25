import React, { useEffect, useState } from 'react'
import Button from './Button'
import Tag from './Tag' // Assuming you have a Tag component

const DropdownSearchAdd = ({ onAddItem, onAddToDatabase }) => {
  const items = ['ReactJS', 'HTML', 'CSS', 'MongoDB', 'VueJS']
  const [search, setSearch] = useState('')
  const [focus, setFocus] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [filteredItems, setFilteredItems] = useState(items)
  const [tags, setTags] = useState([]) // State to hold the added tags

  // Handle search input and filter items
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearch(value)
    const filtered = items?.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredItems(filtered)
  }

  // Handle when an item is selected from dropdown
  const handleSelectItem = (item) => {
    setSearch(item)
    setSelectedItem(item)
    setFocus(false) // Close dropdown when item is selected
  }

  // Handle adding a new tag (skill)
  const handleAddTag = () => {
    const newTag = selectedItem || search
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]) // Add new tag to the tags array
      setSearch('') // Clear search input
      setSelectedItem(null) // Reset selected item
    }
  }

  // Remove tag from the list
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove)) // Remove tag
  }

  useEffect(() => {
    console.log(focus)
  }, [focus])

  return (
    <div className=" w-full gap-4 relative">
      <div className="flex flex-row gap-4 ">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          onFocus={() => setFocus(true)}
          placeholder="Tìm kiếm và thêm kỹ năng"
          className="outline-none border px-4 py-2 rounded-md flex-1"
        />
        <Button
          label={'Thêm kỹ năng'}
          onClick={handleAddTag} // Add tag on button click
        />
      </div>

      {focus && (
        <div className="absolute left-0 w-1/3 max-h-40 bg-white rounded shadow-lg overflow-y-auto z-100">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelectItem(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}

      {/* Render added tags */}
      <div className="flex flex-col gap-2 py-4">
        <div>Các kỹ năng : </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Tag
              key={index}
              label={tag}
              remove={true}
              onRemove={() => handleRemoveTag(tag)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default DropdownSearchAdd
