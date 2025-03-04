import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Line from '../components/Line'
import info from '../utils/infos'
import avatar from '../assets/imgs/blank-profile-picture-973460_960_720.png'
import { renderBasicCV, renderOtherCV } from '../utils/functions'

const CVTheme_0 = ({ color }) => {
  const { currentRole } = useSelector((state) => state.app)
  const [otherInfo, setOtherInfo] = useState([])
  const [basicInfo, setBasicInfo] = useState([])

  useEffect(() => {
    let renderInfo = info.find((item) => item?.name === 'candidate')
    setBasicInfo(renderInfo?.basicInfo)
    setOtherInfo(renderInfo?.otherInfo)
    console.log(basicInfo)
    console.log(currentRole.basic_info)
  }, [currentRole.basic_info, currentRole.other_info, basicInfo, otherInfo])

  return (
    <div className="w-[794px] flex flex-col mx-8 my-2">
      {/* header */}
      <div
        className={`p-4 flex flex-row gap-4 items-center w-full h-[192px]`}
        style={{ backgroundColor: color, color: '#a6a6a6' }}
      >
        <div className="bg-cover w-[150px] h-[150px] ">
          <img
            src={currentRole?.basic_info?.image?.url || avatar}
            alt="avatar"
            className={`w-full h-full bg-cover bg-center object-cover`}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="gap-2 px-4 py-2">
            <div className="heading-3 text-white">
              {currentRole?.basic_info?.name}
            </div>
            <div className="para-1">UX/UI Design</div>
          </div>
          <div className="grid grid-cols-2 grid-flow-row gap-2 px-4 auto-cols-fr">
            {renderBasicCV(basicInfo?.slice(1, 7), currentRole)}
          </div>
        </div>
      </div>
      {/* container */}
      <div className="flex flex-col gap-2 p-4 bg-white h-fit">
        {renderOtherCV(otherInfo, currentRole, {
          lineComponent: <Line />,
          color: color
        })}
      </div>
    </div>
  )
}

export default CVTheme_0
