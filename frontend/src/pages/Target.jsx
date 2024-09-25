import React, { useState } from 'react'
import Line from '../components/Line'
import Button from '../components/Button'
import Dropdown from '../components/Dropdown'
import RangeSlider from '../components/RangeSlider'

const Target = () => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [range, setRange] = useState([20, 80])

  const handleRangeChange = (newRange) => {
    setRange(newRange)
  }
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col p-4 rounded gap-2 w-2/3">
        <div className="flex flex-col gap-2">
          <span className="heading-2">Công việc mong muốn</span>
          <span className="para-1">
            Chia sẻ loại công việc bạn mong muốn để được giới thiệu cơ hội việc
            làm phù hợp hơn trên trang của chúng tôi.
          </span>
        </div>
        <div className="flex flex-col border border-black rounded p-4 gap-4">
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <span className="flex-1 heading-3">Kỹ năng</span>
              <div className="flex-1">
                <Dropdown
                  label={'Kỹ năng'}
                  options={[
                    { value: 'Reactjs', label: 'Reactjs' },
                    { value: 'MongoDB', label: 'MongoDB' }
                  ]}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <span>0/5 kỹ năng</span>
              <div className="flex flex-wrap gap-2"></div>
            </div>
          </div>
          <Line />
          <div className="flex flex-row justify-between items-center">
            <span className="heading-3">Mức lương</span>
            <div>
              {/* <RangeSlider
                min={0}
                max={100}
                step={1}
                onChange={handleRangeChange}
              /> */}
            </div>
          </div>
          <Line />
          <div className="flex flex-row justify-between items-center">
            <span className="heading-3">Hình thức</span>
            <div>Tags</div>
          </div>
          <Line />
          <div className="flex flex-row justify-between items-center">
            <span className="heading-3">Địa điểm</span>
            <div>Dropdown</div>
          </div>
        </div>
        <div className="w-full">
          <Button label={'Lưu'} onClick={() => {}} />
        </div>
      </div>
    </div>
  )
}

export default Target
