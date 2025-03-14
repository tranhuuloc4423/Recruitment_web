import React from 'react'
import { FiInfo } from 'react-icons/fi'
const Tip = ({ title, label, className = null}) => {
  return (
    <div className={`w-full flex flex-row items-center gap-1 ${className}`}>
      <span className="text-second font-bold flex flex-row items-center">
        <FiInfo size={24} color="#FDBD11" />
        {title}:
      </span>
      <span>{label}</span>
    </div>
  )
}

export default Tip
