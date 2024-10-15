import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Line from '../components/Line'
import avatar from '../assets/imgs/blank-profile-picture-973460_960_720.png'

import info from '../utils/infos'

const CVTheme_1 = ({ color }) => {
  const { currentRole } = useSelector((state) => state.app)
  const [otherInfo, setOtherInfo] = useState()
  const [basicInfo, setBasicInfo] = useState()
  useEffect(() => {
    let renderInfo = info.find((item) => item?.name === 'candidate')
    setBasicInfo(renderInfo?.basicInfo)
    setOtherInfo(renderInfo?.otherInfo)
  }, [currentRole.basic_info, currentRole.other_info])
  return (
    <div className="flex flex-col px-8 py-2 w-[794px]">
      {/* header */}
      <div
        className={`py-4 px-10 flex flex-row gap-4 items-end w-full h-[192px] relative z-10 overflow-hidden bg-white`}
      >
        <div class="absolute inset-0 bg-[#e9e9e9] -z-10 transform -skew-y-6 origin-bottom-left"></div>
        <div className="flex-1 flex flex-col">
          <div className="gap-2 pb-6">
            <div className="heading-1 font-medium">
              {currentRole?.basic_info?.name}
            </div>
            <div className="para-1">UX/UI Design</div>
          </div>
        </div>

        <div className="bg-cover w-[150px] h-[150px] rounded-full overflow-hidden border-2 border-white">
          <img
            src={currentRole?.basic_info.image || avatar}
            alt="avatar"
            className={`w-full h-full bg-cover bg-center`}
          />
        </div>
      </div>
      {/* container */}
      <div className="flex flex-row gap-4 p-4 bg-white w-full h-[931px]">
        <div className="flex flex-col gap-4 w-[35%]">
          <div>
            <span className={`uppercase text-lg font-medium`} style={{ color }}>
              Thông tin cá nhân
            </span>
            {basicInfo?.map(({ name, icon }) => (
              <div key={name}>
                {icon && (
                  <div className="flex items-center gap-2 py-2">
                    <span>{icon}</span>
                    <span>{currentRole?.basic_info[name]}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {otherInfo?.slice(0, 3).map((item, index) => {
            return (
              <div key={index} className="flex flex-col">
                <div className="flex flex-col items-start justify-between gap-4">
                  <span
                    className={`uppercase text-lg font-medium`}
                    style={{ color }}
                  >
                    {item.title}
                  </span>
                  <div className="flex-1">
                    {item?.name === 'skills' ? (
                      <div>
                        {currentRole?.other_info?.[item?.name]?.map((skill) => (
                          <div
                            key={skill.value}
                            className="flex items-center gap-2"
                          >
                            <span>{skill?.label}</span>
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
              </div>
            )
          })}
        </div>
        <Line direction="y" />
        <div className="flex flex-col w-[65%]">
          {otherInfo?.slice(3, 6).map((item, index) => {
            return (
              <div key={index} className="flex flex-col w-full">
                <div className="flex flex-col items-start justify-between">
                  <span
                    className={`uppercase text-lg font-medium`}
                    style={{ color }}
                  >
                    {item.title}
                  </span>
                  <div className="flex-1">
                    {item?.name === 'skills' ? (
                      <div>
                        {currentRole?.other_info?.[item?.name]?.map((skill) => (
                          <div
                            key={skill.value}
                            className="flex items-center gap-2 py-2"
                          >
                            <span>{skill?.label}</span>
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
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CVTheme_1
