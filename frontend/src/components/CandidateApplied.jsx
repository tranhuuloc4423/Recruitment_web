import React from 'react'
import { addClassToElements, htmlToText } from '../utils/functions'
import Tag from './Tag'
import Button from './Button'

const CandidateApplied = ({ candidates, handleApproved }) => {
  return (
    <div className='grid grid-cols-5 gap-4'>
      {candidates?.map((candidate, index) => (
        <div
          key={index}
          className="p-2 bg-white rounded shadow-sm border flex flex-col items-start gap-2 justify-between"
        >
          <div className="bg-blue-100 w-full flex flex-col items-center gap-2 p-2">
            <img
              src={candidate.basic_info.image.url}
              alt={candidate.basic_info.name}
              className="w-[100px] h-[100px] rounded-full object-cover"
            />
            <h3 className="text-center font-semibold">
              {candidate.basic_info.name}
            </h3>
          </div>

          <div
            title={htmlToText(candidate.other_info.desc)}
            data-tooltip-place="top"
            className="text-center text-sm text-gray-700"
            dangerouslySetInnerHTML={{
              __html: addClassToElements(
                candidate.other_info.desc,
                'line-clamp-3 overflow-hidden text-ellipsis'
              )
            }}
          />

          <div className="flex gap-2 items-center flex-wrap">
            <div>Kỹ năng :</div>
            {candidate.other_info.skills.map((skill, index) => (
              <Tag key={index} label={skill.name} />
            ))}
          </div>
          <div className="flex gap-2 flex-col items-center w-full">
            <Button label={'Xem hồ sơ CV'} />
            <Button label={'Duyệt'} onClick={() => handleApproved(candidate)} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default CandidateApplied
