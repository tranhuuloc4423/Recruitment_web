import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getCandidatesByPost, getPost } from '../redux/api/post'
import { getCandidate, getCandidates } from '../redux/api/app'
import { useSelector } from 'react-redux'
import { Button } from '../components'

const ManagePostApplied = () => {
  const { skillsDB } = useSelector((state) => state.app)
  console.log(skillsDB)
  const location = useLocation()
  const [post, setPost] = useState(null)
  const [candidates, setCandidates] = useState([])

  // const candidates = [
  //   {
  //     avatar: 'https://via.placeholder.com/64',
  //     name: 'Trần Hữu Lộc',
  //     role: 'UX/UI Design',
  //     description:
  //       'Collaborate with other team members (backend, product, marketing, design) for external web services.',
  //     skills: ['ReactJS', 'Javascript', 'HTML5']
  //   },
  //   {
  //     avatar: 'https://via.placeholder.com/64',
  //     name: 'Nguyễn Văn A',
  //     role: 'Backend Developer',
  //     description:
  //       'Experience in NodeJS, MongoDB, RESTful APIs, and microservices.',
  //     skills: ['NodeJS', 'Express', 'MongoDB']
  //   }
  // ]

  const handleGetPost = async () => {
    const res = await getPost(location.state.id)
    setPost(res)
    console.log(res)
  }
  const handleGetCandidates = async () => {
    const res = await getCandidatesByPost(location.state.id)
    console.log(res.applied)
    setCandidates(res.applied)
  }

  useEffect(() => {
    if (location.state.id) {
      console.log(location.state.id)
      handleGetPost()
      handleGetCandidates()
    }
  }, [location.state.id])

  return (
    <div className="w-full bg-white rounded shadow p-4">
      {/* Header */}
      <header className="border-b pb-4">
        <h1 className="text-xl font-bold mb-2">{post?.title}</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>
              <strong>Lương:</strong> {post?.salary} VND
            </p>
            <p>
              <strong>Hình thức:</strong> {post?.workForm}
            </p>
            <p>
              <strong>Địa chỉ:</strong>{' '}
              {post?.location.address[0].province.name},{' '}
              {post?.location.address[0].district.name}
            </p>
          </div>
          <div>
            <p>
              <strong>Thời hạn:</strong> {post?.date_expiration}
            </p>
            <p>
              <strong>Vị trí:</strong> {post?.position}
            </p>
            <p>
              <strong>Số lượng người:</strong> {post?.quantity}
            </p>
          </div>
        </div>
      </header>

      {/* Container */}
      <div className="py-4">
        <h2 className="text-lg font-semibold mb-4">Danh sách ứng viên</h2>
        <div className="grid grid-cols-4 gap-4">
          {candidates?.map((candidate, index) => (
            <div
              key={index}
              className="bg-blue-100 p-4 rounded shadow flex flex-col items-center gap-2"
            >
              <img
                src={candidate.basic_info.image.url}
                alt={candidate.basic_info.name}
                className="w-[70px] h-[70px] rounded-full mb-2 object-cover"
              />
              <h3 className="text-center font-semibold">
                {candidate.basic_info.name}
              </h3>
              {/* <p className="text-center text-sm text-gray-700">
                {candidate.role}
              </p> */}
              <p className="text-sm text-center mt-2">
                {candidate.other_info.description}
              </p>
              <div className="flex gap-2 mt-2">
                {candidate.other_info.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-200 rounded text-sm"
                  >
                    {skillsDB.find((s) => s._id === skill)?.name}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 mt-4 flex-col">
                <Button label={'Xem hồ sơ CV'} />
                <Button label={'Duyệt'} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="flex justify-between border-t pt-4">
        <Button label={'Quay lại'} />
        <Button label={'Xác nhận'} />
      </footer>
    </div>
  )
}

export default ManagePostApplied
