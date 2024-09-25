import React, { useState } from 'react'

const RangeSlider = ({ min, max, step, onChange }) => {
  const [range, setRange] = useState([min, max])

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), range[1] - step)
    setRange([value, range[1]])
    onChange([value, range[1]])
  }

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), range[0] + step)
    setRange([range[0], value])
    onChange([range[0], value])
  }

  return (
    <div className="relative w-full">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={range[0]}
        onChange={handleMinChange}
        className="absolute w-full h-0 pointer-events-none appearance-none"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={range[1]}
        onChange={handleMaxChange}
        className="absolute w-full h-0 pointer-events-none appearance-none"
      />
      <div className="relative w-full h-2 bg-gray-300 rounded-md my-6">
        <div
          className="absolute h-2 bg-green-500 rounded-md"
          style={{
            left: `${((range[0] - min) / (max - min)) * 100}%`,
            right: `${100 - ((range[1] - min) / (max - min)) * 100}%`
          }}
        ></div>
      </div>
      <div className="flex justify-between text-sm">
        <span>Min: {range[0]}</span>
        <span>Max: {range[1]}</span>
      </div>
    </div>
  )
}

export default RangeSlider
