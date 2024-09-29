import React, { useState } from 'react'
import Line from '../components/Line'
import Button from '../components/Button'
import Tag from '../components/Tag'
import Dropdown from '../components/Dropdown'
import RangeSlider from '../components/RangeSlider'

const Target = () => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [address, setAddress] = useState(null)
  const [salarys, setSalarys] = useState([0, 100])

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
              <div className="flex-1 flex flex-row gap-4">
                <Dropdown
                  label={'Kỹ năng'}
                  options={[
                    { value: 'Reactjs' },
                    { value: 'MongoDB' },
                    { value: 'HTML' },
                    { value: 'CSS' },
                    { value: 'VueJS' },
                    { value: 'Angular' }
                  ]}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                />
                <Button label={'Thêm'} onClick={() => {}} />
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <span>0/5 kỹ năng</span>
              <div className="flex flex-wrap gap-2"></div>
            </div>
          </div>
          <Line />
          <div className="flex flex-row justify-between items-center">
            <span className="flex-1 heading-3">Mức lương</span>
            <div className="flex-1">
              <RangeSlider values={salarys} setValues={setSalarys} />
            </div>
          </div>
          <Line />
          <div className="flex flex-row justify-between items-center">
            <span className="heading-3">Hình thức</span>
            <div className="flex items-center gap-4">
              <Tag label={'Toàn thời gian'} plus />
              <Tag label={'Bán thời gian'} plus />
            </div>
          </div>
          <Line />
          <div className="flex flex-row justify-between items-center">
            <span className="heading-3">Loại hình</span>
            <div className="flex items-center gap-4">
              <Tag label={'Tại văn phòng'} plus />
              <Tag label={'Từ xa'} plus />
              <Tag label={'Linh hoạt'} plus />
            </div>
          </div>
          <Line />
          <div className="flex flex-row justify-between items-center">
            <span className="flex-1 heading-3">Địa điểm</span>
            <div className="flex-1">
              <Dropdown
                label={'Địa điểm'}
                options={[
                  { value: 'Tp Hồ Chí Minh' },
                  { value: 'Hà nội' },
                  { value: 'Bình Dương' },
                  { value: 'Đồng Nai' }
                ]}
                selectedOption={address}
                setSelectedOption={setAddress}
              />
            </div>
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
