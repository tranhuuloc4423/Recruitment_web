import React, { useState } from 'react'
import { FaCheck, FaPlus, FaMinus } from 'react-icons/fa6'
const Tag = ({ label, remove, plus, onRemove, value }) => {
  const [checked, setChecked] = useState(false)
  return (
    <div
      onClick={() => setChecked(!checked)}
      className="px-2 py-1 border border-black rounded-full flex flex-row gap-2 items-center cursor-pointer"
    >
      <span className="para-1 font-medium">{label}</span>

      {plus && checked ? (
        <span>
          <FaCheck size={16} />
        </span>
      ) : (
        <span>
          <FaPlus size={16} />
        </span>
      )}
      {remove && (
        <span onClick={onRemove}>
          <FaMinus size={16} />
        </span>
      )}
    </div>
  )
}

export default Tag
