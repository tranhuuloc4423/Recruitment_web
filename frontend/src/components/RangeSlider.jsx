import { useState, useEffect, useRef } from 'react'
import ReactSlider from 'react-slider'

const RangeSlider = ({ values, setValues, isLabel = false }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null) // Ref để tham chiếu đến dropdown

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleSliderClick = (e) => {
    e.stopPropagation()
  }

  // Đóng dropdown khi nhấp ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  return (
    <>
      {isLabel ? (
        <div
          onClick={toggleDropdown}
          className={`relative w-full h-fit border-2 p-2 rounded flex flex-row items-center justify-between select-none bg-white`}
        >
          <div className="w-full">Mức lương</div>
          <div
            ref={dropdownRef} // Gắn ref vào div dropdown
            className={`rounded bg-white absolute border border-gray-100 shadow-md max-h-40 top-[100%] overflow-auto z-[1000] left-0 w-full transition-all ${
              isOpen ? 'cursor-pointer' : 'hidden'
            }`}
            onClick={handleSliderClick}
          >
            <div className="w-full px-2">
              <ReactSlider
                className="slider"
                thumbClassName="thumb"
                trackClassName="example-track"
                value={values}
                ariaLabel={['Lower thumb', 'Upper thumb']}
                ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                pearling
                onChange={setValues}
                minDistance={5}
                step={5}
              />
              <div className="mt-4 px-2">
                <div>
                  Mức lương:{' '}
                  {values[0] === 0
                    ? `${values[0]} vnđ`
                    : `${values[0]}.000.000 vnđ`}{' '}
                  - {values[1]}.000.000 vnđ
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <ReactSlider
            className="slider"
            thumbClassName="thumb"
            trackClassName="example-track"
            value={values}
            ariaLabel={['Lower thumb', 'Upper thumb']}
            ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
            pearling
            onChange={setValues}
            minDistance={5}
            step={5}
          />
          <div className="mt-4">
            <span>
              Mức lương:{' '}
              {values[0] === 0
                ? `${values[0]} vnđ`
                : `${values[0]}.000.000 vnđ`}{' '}
              - {values[1]}.000.000 vnđ
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default RangeSlider