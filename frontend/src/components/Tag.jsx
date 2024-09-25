import React from 'react'
import { FaCheck, FaPlus, FaMinus } from 'react-icons/fa6'
const Tag = ({ label, remove, plus, onRemove, value }) => {
  // const [checked, setChecked] = useState(false)
  return (
    <div className="px-4 py-2 border border-black rounded-full flex flex-row gap-2 items-center cursor-pointer">
      <span>{label}</span>
      {/* {<FaCheck size={24} />}
      {plus && <FaPlus size={24} />} */}
      {remove && (
        <span onClick={onRemove}>
          <FaMinus size={16} />
        </span>
      )}
    </div>
  )
}

export default Tag
