import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import info from '../utils/infos'
import cv_t_0 from '../assets/imgs/cv_template_0.png'
import cv_t_1 from '../assets/imgs/cv_template_1.png'
import { FaCheck } from 'react-icons/fa6'
import Line from '../components/Line'

const CVprofile = () => {
  const { currentRole } = useSelector((state) => state.app)
  const [bg, setBg] = useState('#b6ceff')
  const [active, setActive] = useState(0)
  const [otherInfo, setOtherInfo] = useState()
  const [basicInfo, setBasicInfo] = useState()
  useEffect(() => {
    setOtherInfo(info.find((item) => item?.name === 'candidate')?.otherInfo)
  }, [otherInfo])

  useEffect(() => {
    setBasicInfo(info.find((item) => item?.name === 'candidate')?.basicInfo)
  }, [basicInfo])

  return (
    <div className="flex flex-row">
      <div className="flex flex-row items-center w-1/3 gap-4">
        <div
          className={`w-1/2 cursor-pointer relative ${
            active === 0 ? 'border-second border-4' : ''
          }`}
          onClick={() => setActive(0)}
        >
          <img src={cv_t_0} alt="" className="w-full" />
          {active === 0 && (
            <span className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-3 bg-second rounded-full">
              <FaCheck size={48} color="white" />
            </span>
          )}
        </div>
        <div
          className={`w-1/2 cursor-pointer relative ${
            active === 1 ? 'border-second border-4' : ''
          }`}
          onClick={() => setActive(1)}
        >
          <img src={cv_t_1} alt="" className="w-full" />
          {active === 1 && (
            <span className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-3 bg-second rounded-full">
              <FaCheck size={48} color="white" />
            </span>
          )}
        </div>
      </div>
      <div className="w-2/3 flex justify-center">
        <div className="w-4/5 flex flex-col px-8 py-2">
          <div
            className={`p-4 flex flex-row gap-4 items-center w-full bg-[#b6ceff]`}
          >
            <div className="bg-cover w-[100px] h-[100px]">
              <img
                src={currentRole?.basic_info.image}
                className={`w-full h-full bg-cover bg-center`}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <div className="gap-2 px-4 py-2">
                <div className="heading-3">{currentRole?.basic_info.name}</div>
                <div className="para-1">UX/UI Design</div>
              </div>
              <div className="flex flex-row gap-4">
                {basicInfo?.slice(0, 4).map(({ name, label, icon }) => (
                  <React.Fragment key={name}>
                    {icon && (
                      <div className="flex items-center gap-2 py-2 px-4">
                        <span>{icon}</span>
                        <span>{currentRole?.basic_info[name]}</span>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex flex-row gap-4">
                {basicInfo?.slice(4, 7).map(({ name, label, icon }) => (
                  <React.Fragment key={name}>
                    {icon && (
                      <div className="flex items-center gap-2 py-2 px-4">
                        <span>{icon}</span>
                        <span>{currentRole?.basic_info[name]}</span>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-4">
            <div className="w-full">
              {otherInfo?.map((item, index) => {
                return (
                  <div className="flex flex-col gap-4">
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
        </div>
      </div>
    </div>
  )
}

export default CVprofile
