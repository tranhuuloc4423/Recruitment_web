import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Line from '../components/Line'
import info from '../utils/infos'
import avatar from '../assets/imgs/blank-profile-picture-973460_960_720.png'

const CVTheme_0 = ({ color }) => {
  const { currentRole } = useSelector((state) => state.app)
  const [otherInfo, setOtherInfo] = useState()
  const [basicInfo, setBasicInfo] = useState()
  useEffect(() => {
    setOtherInfo(info.find((item) => item?.name === 'candidate')?.otherInfo)
  }, [otherInfo])

  useEffect(() => {
    setBasicInfo(info.find((item) => item?.name === 'candidate')?.basicInfo)
  }, [basicInfo])
  return (
    <div className="w-[794px] flex flex-col px-8 py-2 ">
      {/* header */}
      <div
        className={`p-4 flex flex-row gap-4 items-center w-full h-[192px]`}
        style={{ backgroundColor: color, color: '#a6a6a6' }}
      >
        <div className="bg-cover w-[100px] h-[100px]">
          <img
            src={currentRole?.basic_info.image || avatar}
            className={`w-full h-full bg-cover bg-center`}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="gap-2 px-4 py-2">
            <div className="heading-3 text-white">
              {currentRole?.basic_info.name}
            </div>
            <div className="para-1">UX/UI Design</div>
          </div>
          <div className="flex flex-row gap-4 px-4">
            {basicInfo?.slice(0, 4).map(({ name, label, icon }) => (
              <React.Fragment key={name}>
                {icon && (
                  <div className="flex items-center gap-2 py-2 flex-1">
                    <span>{icon}</span>
                    <span>{currentRole?.basic_info[name]}</span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex flex-row gap-4 px-4">
            {basicInfo?.slice(4, 7).map(({ name, label, icon }) => (
              <React.Fragment key={name}>
                {icon && (
                  <div className="flex items-center gap-2 py-2 flex-1">
                    <span>{icon}</span>
                    <span>{currentRole?.basic_info[name]}</span>
                  </div>
                )}
              </React.Fragment>
            ))}
            <span className="flex-1"></span>
          </div>
        </div>
      </div>
      {/* container */}
      <div className="flex flex-col gap-2 p-4 bg-white h-[931px]">
        {otherInfo?.map((item, index) => {
          return (
            <div key={index} className="flex flex-col gap-4 py-2">
              <div className="flex flex-row items-start justify-between gap-4">
                <span className="text-xl">{item.title}</span>
                <div className="flex-1">
                  {currentRole?.other_info[item.name]}
                </div>
              </div>
              {index === otherInfo.length - 1 ? '' : <Line />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CVTheme_0
