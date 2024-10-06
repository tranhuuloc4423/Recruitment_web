import React from 'react'
import { FaCheck, FaPlus, FaMinus } from 'react-icons/fa6'
const Tag = ({ label, remove, plus, onRemove, checked, setChecked }) => {
  return (
    <div
      onClick={setChecked ? () => setChecked(!checked) : () => null}
      className="px-2 py-1 border border-black rounded-full flex flex-row gap-2 items-center cursor-pointer"
    >
      <span className="para-1 font-medium">{label}</span>
      {plus && (
        <span>{checked ? <FaCheck size={16} /> : <FaPlus size={16} />}</span>
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
