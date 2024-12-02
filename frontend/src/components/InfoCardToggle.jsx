import React, { useRef, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import Line from './Line'

const InfoCardToggle = ({ title, children }) => {
  const [open, setOpen] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const contentRef = useRef(null)

  const toggleOpen = () => {
    if (open) {
      // Đóng: Đặt height về 0
      setContentHeight(0)
    } else {
      // Mở: Lấy chiều cao thực tế của nội dung
      setContentHeight(contentRef.current.scrollHeight)
    }
    setOpen(!open)
  }

  const renderContent = () => {
    if (typeof children === 'string') {
      return (
        <div
          className="w-full"
          dangerouslySetInnerHTML={{ __html: children }}
        ></div>
      )
    }

    if (Array.isArray(children)) {
      // Kiểm tra xem mảng có chứa đối tượng hình ảnh hay không
      if (
        children.length > 0 &&
        typeof children[0] === 'object' &&
        children[0].url
      ) {
        return (
          <div className="w-full flex flex-wrap gap-4 rounded">
            {children.map((item, index) => (
              <div key={index} className="">
                <img
                  src={item?.url}
                  alt={`Image ${index}`}
                  className="w-[200px] h-[200px] object-cover rounded"
                />
              </div>
            ))}
          </div>
        )
      }

      // Nếu là mảng các chuyên môn hoặc các loại khác
      return (
        <ul className="list-disc list-inside">
          {children.map((item, index) => (
            <li key={index}>{item.name || item}</li>
          ))}
        </ul>
      )
    }

    // Nếu là đối tượng đơn lẻ
    if (typeof children === 'object') {
      return <pre>{JSON.stringify(children, null, 2)}</pre>
    }

    return <div className="w-full">{children}</div>
  }

  return (
    <div className="flex flex-col bg-white rounded p-4 gap-2 w-full">
      <div className="flex flex-row items-center justify-between">
        <span className="heading-3">{title}</span>
        <div onClick={toggleOpen} className="cursor-pointer">
          <IoIosArrowDown
            size={24}
            className={`${open ? 'rotate-180 transition-transform' : ''}`}
          />
        </div>
      </div>
      <Line />
      {/* Nội dung với hiệu ứng */}
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ height: `${contentHeight}px` }}
        ref={contentRef}
      >
        <div>{renderContent()}</div>
      </div>
    </div>
  )
}

export default InfoCardToggle
