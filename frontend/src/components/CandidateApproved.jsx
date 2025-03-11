import React, { useEffect } from 'react'
import { addClassToElements, htmlToText } from '../utils/functions'
import Tag from './Tag'
import Button from './Button'
import { useSelector } from 'react-redux'

const CandidateApproved = ({ candidates, hanleViewCV, owner }) => {
  const { currentRole} = useSelector((state) => state.app)
  const handleContact = (candidate) => {
    const recipientEmail = candidate.basic_info.email;
    const name = owner?.basic_info?.name
    const subject = `Liên hệ từ ${name} qua website tuyển dụng`;
  
    const body =
      `Chào ${candidate.basic_info.name},\n\n` +
      `Tôi là ${name}. Chúng tôi đã xem CV của bạn trên website và rất ấn tượng với kinh nghiệm của bạn.\n\n` +
      `Xin vui lòng phản hồi để chúng tôi có thể trao đổi thêm.\n\n` +
      `Trân trọng,\n` +
      `${name}`;
  
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      recipientEmail
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
    window.open(gmailUrl, '_blank');
  };
  
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
            <Button label={'Xem hồ sơ CV'} onClick={() => hanleViewCV(candidate._id)} />
            {owner?._id === currentRole?._id && (
              <Button label={'Liên lạc'} onClick={() => handleContact(candidate)} />
            )}
            
          </div>
        </div>
      ))}
    </div>
  )
}

export default CandidateApproved
