import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Line from '../components/Line'
import info from '../utils/infos'
import avatar from '../assets/imgs/blank-profile-picture-973460_960_720.png'
import { renderBasicCV, renderOtherCV } from '../utils/functions'

const CVTheme_0 = ({ color, data = null }) => {
  const { currentRole } = useSelector((state) => state.app)
  const [candidate, setCandidate] = useState(data || currentRole)
  const [otherInfo, setOtherInfo] = useState([])
  const [basicInfo, setBasicInfo] = useState([])

  useEffect(() => {
    let renderInfo = info.find((item) => item?.name === 'candidate')
    setBasicInfo(renderInfo?.basicInfo)
    setOtherInfo(renderInfo?.otherInfo)
  }, [currentRole.basic_info, currentRole.other_info, basicInfo, otherInfo])

  return (
    <div className="w-full lg:w-[798px] flex flex-col mt-6">
      {/* header */}
      <div
        className={`p-4 flex flex-row gap-4 items-center w-full `}
        style={{ backgroundColor: color, color: '#a6a6a6' }}
      >
        <div className="bg-cover w-[150px] h-[150px] ">
          <img
            src={candidate?.basic_info?.image?.url || avatar}
            alt="avatar"
            className={`w-full h-full bg-cover bg-center object-cover`}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="gap-2 px-4 py-2">
            <div className="heading-3 text-white">
              {candidate?.basic_info?.name}
            </div>
            <div className="para-1">UX/UI Design</div>
          </div>
          <div className="grid lg:grid-cols-2 grid-flow-row gap-2 px-4 auto-cols-fr">
            {renderBasicCV(basicInfo?.slice(1, 7), candidate)}
          </div>
        </div>
      </div>
      {/* container */}
      <div className="flex flex-col gap-2 p-4 bg-white h-fit">
        {renderOtherCV(otherInfo, candidate, {
          lineComponent: <Line />,
          color: color
        })}
      </div>
    </div>
  )
}

export default CVTheme_0
