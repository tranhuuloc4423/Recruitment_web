import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  getCandidatesByPost,
  getOwnerById,
  getPost,
  updateApproved
} from '../redux/api/post'
import { getCandidate, getCandidates } from '../redux/api/app'
import { useSelector } from 'react-redux'
import { Button, Tag } from '../components'
import { GoInfo } from 'react-icons/go'
import Swal from 'sweetalert2'
import { Tooltip } from 'react-tooltip'

const ManagePostApplied = () => {
  const { skillsDB } = useSelector((state) => state.app)
  const { currentUser } = useSelector((state) => state.auth)
  console.log(skillsDB)
  const location = useLocation()
  const [post, setPost] = useState(null)
  const [owner, setOwner] = useState(null)
  const [candidates, setCandidates] = useState([])
  const [descText, setDescContent] = useState('')

  const handleGetData = async () => {
    const res = await getPost(location.state.id)
    setPost(res)
    const res2 = await getOwnerById(res.author, res.authorType)
    setOwner(res2)
    console.log(res2)
    const res3 = await getCandidatesByPost(location.state.id)
    setCandidates(res3.applied)
    console.log(res3.applied)
  }

  const handleApproved = async (candidate) => {
    Swal.fire({
      title: 'Tôi nhắc bạn?',
      text: `Bạn có chắc muốn duyệt ứng viên ${candidate.basic_info.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'suy nghĩ lại',
      confirmButtonText: 'chắc chắn'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const postId = location.state.id
        await updateApproved(postId, candidate._id)
      }
    })
  }

  const htmlToText = (htmlString) => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = htmlString
    return tempDiv.textContent || tempDiv.innerText || ''
  }

  const addClassToElements = (htmlString, className) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlString, 'text/html')

    // Lặp qua tất cả các phần tử con và thêm class
    doc.body.querySelectorAll('*').forEach((el) => {
      el.classList.add(...className.split(' '))
    })

    return doc.body.innerHTML
  }

  useEffect(() => {
    if (location.state.id) {
      console.log(location.state.id)
      handleGetData()
    }
  }, [location.state.id])

  return (
    <div className="w-full rounded p-4 flex flex-col gap-4">
      {/* Header */}

      <header className="pb-4 bg-white p-4">
        <div className="text-2xl font-semibold mb-2">{post?.title}</div>
        <div className="text-xl text-second flex items-center gap-2">
          <GoInfo size={24} /> <span>Thông tin cơ bản</span>
        </div>
        <div className="grid grid-cols-2 gap-4 ">
          <div>
            <p>
              <strong>Lương:</strong> {post?.salary} VND
            </p>
            <div className="flex items-center gap-2">
              <strong>Hình thức: </strong>
              <div className="flex gap-2 items-center">
                {owner?.other_info.wforms?.map((item) => (
                  <Tag key={item._id} label={item.name} />
                ))}
              </div>
            </div>
            <p>
              <strong>Địa chỉ:</strong>
              {post?.location.address[0].province.name},
              {post?.location.address[0].district.name}
            </p>
          </div>
          <div>
            <p>
              <strong>Thời hạn:</strong> {post?.date_expiration}
            </p>
            <div className="flex items-center gap-2">
              <strong>Phương thức:</strong>{' '}
              <div className="flex items-center gap-2">
                {owner?.other_info.types?.map((item) => (
                  <Tag key={item._id} label={item.name} />
                ))}
              </div>
            </div>
            <p>
              <strong>Số lượng người:</strong> {post?.quantity}
            </p>
          </div>
        </div>
      </header>

      {/* Container */}
      <div className="py-4">
        <h2 className="text-lg font-semibold mb-4">Danh sách ứng viên</h2>
        <div className="grid grid-cols-5 gap-4">
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
                <Button
                  label={'Duyệt'}
                  onClick={() => handleApproved(candidate)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="flex justify-between">
        <Button label={'Quay lại'} />
        <Button label={'Xác nhận'} />
      </footer>
    </div>
  )
}

export default ManagePostApplied
