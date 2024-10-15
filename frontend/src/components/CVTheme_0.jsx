import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Line from '../components/Line'
import info from '../utils/infos'
import avatar from '../assets/imgs/blank-profile-picture-973460_960_720.png'

const CVTheme_0 = ({ color }) => {
  const { currentRole } = useSelector((state) => state.app)
  const [otherInfo, setOtherInfo] = useState([])
  const [basicInfo, setBasicInfo] = useState([])

  useEffect(() => {
    let renderInfo = info.find((item) => item?.name === 'candidate')
    setBasicInfo(renderInfo?.basicInfo)
    setOtherInfo(renderInfo?.otherInfo)
  }, [currentRole.basic_info, currentRole.other_info, basicInfo, otherInfo])

  return (
    <div className="w-[794px] flex flex-col px-8 py-2 ">
      {/* header */}
      <div
        className={`p-4 flex flex-row gap-4 items-center w-full h-[192px]`}
        style={{ backgroundColor: color, color: '#a6a6a6' }}
      >
        <div className="bg-cover w-[100px] h-[100px]">
          <img
            src={currentRole?.basic_info?.image || avatar}
            alt="avatar"
            className={`w-full h-full bg-cover bg-center`}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="gap-2 px-4 py-2">
            <div className="heading-3 text-white">
              {currentRole?.basic_info?.name}
            </div>
            <div className="para-1">UX/UI Design</div>
          </div>
          <div className="grid grid-cols-3 grid-flow-row gap-2 px-4">
            {basicInfo?.slice(1, 4)?.map((item, index) => (
              <div key={index}>
                {item?.icon && (
                  <div className="flex items-center gap-2 py-2 flex-1">
                    <span>{item?.icon}</span>
                    <span>{currentRole?.basic_info[item.name]}</span>
                  </div>
                )}
              </div>
            ))}
            {basicInfo?.slice(4, 7)?.map((item, index) => (
              <div key={index}>
                {item?.icon && (
                  <div className="flex items-center gap-2 py-2 flex-1">
                    <span>{item?.icon}</span>
                    <span>{currentRole?.basic_info[item.name]}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* container */}
      <div className="flex flex-col gap-2 p-4 bg-white h-[931px]">
        {otherInfo?.map((item, index) => {
          return (
            <div key={index} className="flex flex-col gap-4">
              <div className="flex flex-col items-start justify-between">
                <span className="text-xl">{item.title}</span>
                <div className="flex-1">
                  {item?.name === 'skills' ? (
                    <div>
                      {currentRole?.other_info?.[item.name]?.map((skill) => (
                        <div key={skill.value} className="para-1">
                          {skill?.label}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: currentRole?.other_info?.[item.name]
                      }}
                    ></div>
                  )}
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
