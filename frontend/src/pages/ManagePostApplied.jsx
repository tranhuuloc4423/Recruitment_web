import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getPost } from '../redux/api/post'
import { getCandidate, getCandidates } from '../redux/api/app'

const ManagePostApplied = () => {
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
    if (post) {
      console.log({ ids: post?.applied })
      const res = await getCandidates({ ids: post?.applied })
      setCandidates(res)
      console.log(res)
    }
  }

  useEffect(() => {
    if (location.state.id) {
      console.log(location.state.id)
      handleGetPost()
    }
    if (post) {
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
                src={candidate.avatar}
                alt={candidate.name}
                className="w-1/3 rounded-full mb-2"
              />
              <h3 className="text-center font-semibold">{candidate.name}</h3>
              <p className="text-center text-sm text-gray-700">
                {candidate.role}
              </p>
              <p className="text-sm text-center mt-2">
                {candidate.description}
              </p>
              <div className="flex gap-2 mt-2">
                {candidate.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-200 rounded text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">
                  Xem hồ sơ
                </button>
                <button className="bg-green-500 text-white px-3 py-1 rounded">
                  Duyệt
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="flex justify-between border-t pt-4">
        <button className="bg-gray-300 text-black px-4 py-2 rounded">
          Quay lại
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Xác nhận
        </button>
      </footer>
    </div>
  )
}

export default ManagePostApplied
