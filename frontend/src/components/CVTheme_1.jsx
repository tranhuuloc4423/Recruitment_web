import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Line from '../components/Line'
import avatar from '../assets/imgs/blank-profile-picture-973460_960_720.png'

import info from '../utils/infos'
import { renderBasicCV, renderOtherCV } from '../utils/functions'

const CVTheme_1 = ({ color, data = null }) => {
  const { currentRole } = useSelector((state) => state.app)
  const [candidate, setCandidate] = useState(data || currentRole)
  const [otherInfo, setOtherInfo] = useState()
  const [basicInfo, setBasicInfo] = useState()
  useEffect(() => {
    let renderInfo = info.find((item) => item?.name === 'candidate')
    setBasicInfo(renderInfo?.basicInfo)
    setOtherInfo(renderInfo?.otherInfo)
  }, [currentRole.basic_info, currentRole.other_info])
  return (
    <div className="flex flex-col px-8 py-2 w-full lg:w-2/3">
      {/* header */}
      <div
        className={`py-4 px-10 flex flex-row gap-4 items-end w-full h-[192px] relative z-10 overflow-hidden bg-white`}
      >
        <div class="absolute inset-0 bg-[#e9e9e9] -z-10 transform -skew-y-6 origin-bottom-left"></div>
        <div className="flex-1 flex flex-col">
          <div className="gap-2 pb-6">
            <div className="heading-1 font-medium">
              {candidate?.basic_info?.name}
            </div>
            <div className="para-1">UX/UI Design</div>
          </div>
        </div>

        <div className="bg-cover w-[150px] h-[150px] rounded-full overflow-hidden border-2 border-white">
          <img
            src={candidate?.basic_info?.image?.url || avatar}
            alt="avatar"
            className={`w-full h-full bg-cover bg-center object-cover`}
          />
        </div>
      </div>
      {/* container */}
      <div className="flex flex-row gap-4 p-4 bg-white w-full h-fit">
        <div className="flex flex-col gap-4" style={{ width: '45%' }}>
          <div>
            <span className={`uppercase text-lg font-medium`} style={{ color }}>
              Thông tin cá nhân
            </span>
            {renderBasicCV(basicInfo, candidate)}
          </div>

          {renderOtherCV(otherInfo?.slice(0, 3), candidate, {
            color: color
          })}
        </div>
        <Line direction="y" />
        <div className="flex flex-col gap-4" style={{ width: '55%' }}>
          {renderOtherCV(otherInfo?.slice(3, 6), candidate, {
            color: color
          })}
        </div>
      </div>
    </div>
  )
}

export default CVTheme_1
