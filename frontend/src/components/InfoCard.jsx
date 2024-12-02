import React, { useEffect, useState } from 'react'
import { GoPlusCircle } from 'react-icons/go'
import { IoClose } from 'react-icons/io5'
import Line from './Line'
import Button from './Button'
import { useSelector } from 'react-redux'
import Tag from './Tag'

const InfoCard = (props) => {
  const { currentRole } = useSelector((state) => state.app)
  const { title, desc, children, childTitle, onClick, open, setOpen, item } =
    props

  useEffect(() => {}, [children, currentRole.other_info, item])
  return (
    <>
      <div className="flex flex-col bg-white rounded p-4 gap-2">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-2 flex-1">
            <span className="heading-3">{title}</span>
            {!item && <span className="">{desc}</span>}
          </div>
          <div onClick={() => setOpen(true)} className="cursor-pointer">
            <GoPlusCircle size={32} color="#284F9E" />
          </div>
        </div>
        <Line />
        <div className="w-full">
          {item?.type === 'richText' &&
            item?.name &&
            currentRole?.other_info?.[item?.name] && (
              <div
                dangerouslySetInnerHTML={{
                  __html: currentRole?.other_info[item?.name]
                }}
              ></div>
            )}
          {item?.type === 'dropdown' &&
            currentRole?.other_info?.[item.name]?.length > 0 && (
              <div className="flex flex-row gap-2">
                {currentRole?.other_info[item?.name]?.map((item) => (
                  <Tag key={item.value} label={item.name} />
                ))}
              </div>
            )}
          {item?.type === 'images' &&
            currentRole?.other_info?.[item.name]?.length > 0 && (
              <div className="flex flex-wrap gap-2 w-full">
                {currentRole?.other_info[item?.name]?.map((item) => (
                  <img
                    key={item?.url}
                    src={item?.url}
                    className="w-[150px] h-[150px] object-contain"
                    alt="company imgs"
                  />
                ))}
              </div>
            )}
        </div>
      </div>
      {open && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.2)]"
          // onClick={() => setOpen(false)}
        >
          <div
            className="w-1/2 bg-white rounded flex flex-col gap-2 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <span>{childTitle}</span>
              <span onClick={() => setOpen(false)} className="cursor-pointer">
                <IoClose size={24} color="black" />
              </span>
            </div>
            <Line />
            {children}
            <Line />
            <div>
              <Button label={'Lưu'} onClick={onClick} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default InfoCard
