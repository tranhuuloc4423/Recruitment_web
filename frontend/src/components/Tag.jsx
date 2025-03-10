import React from 'react'
import { FaCheck, FaPlus, FaMinus } from 'react-icons/fa6'
const Tag = ({ label, remove, plus, onRemove, checked, setChecked, size = "base" }) => {

  let sizeNum
  switch (size) {
    case "base":
      sizeNum = 16
      break;
    case "sm":
      sizeNum = 14
      break;
    case "lg":
      sizeNum = 18
      break;
    case "xs":
      sizeNum = 12
      break;
      case "xl":
      sizeNum = 20
      break;
  } 
  return (
    <div
      onClick={setChecked ? () => setChecked(!checked) : () => null}
      className="px-3 py-1 border border-gray-100 rounded-full flex flex-row gap-2 items-center cursor-pointer"
    >
      <span className={`para-1 font-medium text-black-100 text-${size}`}>{label}</span>
      {plus && (
        <span>{checked ? <FaCheck size={sizeNum} /> : <FaPlus size={sizeNum} />}</span>
      )}
      {remove && (
        <span onClick={onRemove}>
          <FaMinus size={sizeNum} />
        </span>
      )}
    </div>
  )
}

export default Tag
