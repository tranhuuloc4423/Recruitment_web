import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  getCandidatesByPost,
  getCandidatesApprovedByPost,
  getOwnerById,
  getPost,
  updateApproved,
  getRankedCandidates
} from '../redux/api/post'
import { useSelector } from 'react-redux'
import { Button, Tag } from '../components'
import { GoInfo } from 'react-icons/go'
import Swal from 'sweetalert2'
import CandidateApproved from '../components/CandidateApproved'
import { addClassToElements, formatSalary } from '../utils/functions'
import CandidateApplied from '../components/CandidateApplied'

const ManagePostApplied = () => {
  // const { skillsDB } = useSelector((state) => state.app)
  const { currentRole } = useSelector((state) => state.app)
  const location = useLocation()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [owner, setOwner] = useState(null)
  const [appliedCandidates, setAppliedCandidates] = useState([])
  const [approvedCandidates, setApprovedCandidates] = useState([])
  const [activeTab, setActiveTab] = useState('applied') // 'applied' hoặc 'approved'

  const handleGetData = async () => {
    const res = await getPost(location.state.id)
    setPost(res)
    const res2 = await getOwnerById(res.author, res.authorType)
    setOwner(res2)
    const res3 = await getCandidatesByPost(location.state.id)
    setAppliedCandidates(res3.applied)
    const res4 = await getCandidatesApprovedByPost(location.state.id)
    setApprovedCandidates(res4.approved)
  }

  const hanleViewCV = (id) => {
    if (!id) {
      console.error('Candidate ID is invalid')
      return
    }

    navigate(`/candidate-cv/${id}`)
  }

  const handleApproved = async (candidate) => {
    Swal.fire({
      title: 'Duyệt ứng viên?',
      text: `Bạn có chắc muốn duyệt ứng viên ${candidate.basic_info.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Quay lại',
      confirmButtonText: 'Chắc chắn'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const postId = location.state.id
        await updateApproved(postId, candidate._id)
        // Sau khi duyệt, refresh lại dữ liệu
        handleGetData()
      }
    })
  }

  const handleRankedCandidates = async () => {
    Swal.fire({
      title: 'Lọc danh sách ứng viên?',
      text: `Lọc danh sách ứng viên theo gợi ý của AI (Huggingface)`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Suy nghĩ lại',
      confirmButtonText: 'Chắc chắn'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const postId = location.state.id
        const data = await getRankedCandidates(postId)
        setAppliedCandidates(data.rankedCandidates.candidates)
        console.log(data)
      }
    })
  }

  useEffect(() => {
    if (location.state.id) {
      handleGetData()
    }
  }, [location.state.id])

  return (
    <div className="w-full rounded p-4 flex flex-col gap-4">
      {/* Header */}
      <header className="bg-white shadow-md rounded-lg p-6 mb-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-800">{post?.title}</h1>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center text-lg font-bold text-primary text-gray-500">
              <GoInfo size={24} className="mr-2" color="#284F9E" />
              <span>Thông tin cơ bản</span>
            </div>
            <div className="w-full h-[1px] bg-gray-200 border"></div>
            <div className="space-y-2">
              <p className="text-gray-700 flex justify-between items-center border-b border-gray-100 border-dashed py-1">
                <span className="font-semibold">Lương:</span>
                <span>{formatSalary(post?.salary)} VND</span>
              </p>
              <div className="flex justify-between items-center space-x-2 border-b border-gray-100 border-dashed py-1">
                <span className="font-semibold text-gray-700">Hình thức:</span>
                <div className="flex flex-wrap gap-2">
                  {owner?.other_info.wforms?.map((item) => (
                    <Tag key={item._id} label={item.name} size={'sm'} />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 flex justify-between items-center border-b border-gray-100 border-dashed py-1">
                <span className="font-semibold">Địa chỉ:</span>{' '}
                <span>
                  {post?.location.address[0].province.name},{' '}
                  {post?.location.address[0].district.name}
                </span>
              </p>
              <p className="text-gray-700 flex justify-between items-center border-b border-gray-100 border-dashed py-1">
                <span className="font-semibold">Thời hạn:</span>{' '}
                {post?.date_expiration}
              </p>
              <div className="flex justify-between items-center space-x-2 border-b border-gray-100 border-dashed py-1">
                <span className="font-semibold text-gray-700">
                  Phương thức:
                </span>
                <div className="flex justify-between items-center flex-wrap gap-2 ">
                  {owner?.other_info.types?.map((item) => (
                    <Tag key={item._id} label={item.name} size={'sm'} />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 flex justify-between items-center border-b border-gray-100 border-dashed py-1">
                <span className="font-semibold">Số lượng người:</span>{' '}
                {post?.quantity} người
              </p>
              <p className="text-gray-700 flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Kỹ năng</span>
                <div className="flex flex-wrap justify-end gap-2">
                  {post?.skills?.map((skill) => (
                    <Tag
                      key={skill._id}
                      label={skill.name}
                      size={'sm'}
                    />
                  ))}
                </div>
              </p>
            </div>

            {/* Kỹ năng */}
          </div>

          {/* Cột 2: Mô tả bài viết */}
          <div className="space-y-2">
            <div className="flex items-center text-lg font-bold text-primary text-gray-500">
              <GoInfo size={24} className="mr-2" color="#284F9E" />
              <span>Mô tả bài viết</span>
            </div>
            <div className="w-full h-[1px] bg-gray-200 border"></div>
            <div
              dangerouslySetInnerHTML={{
                __html: addClassToElements(
                  post?.desc,
                  'text-gray-700 whitespace-pre-line'
                )
              }}
            />
          </div>

          {/* Cột 3: Yêu cầu */}
          <div className="space-y-2">
            <div className="flex items-center text-lg font-bold text-primary text-gray-500">
              <GoInfo size={24} className="mr-2" color="#284F9E" />
              <span>Yêu cầu bài viết</span>
            </div>
            <div className="w-full h-[1px] bg-gray-200 border"></div>
            <div
              dangerouslySetInnerHTML={{
                __html: addClassToElements(
                  post?.request,
                  'text-gray-700 whitespace-pre-line'
                )
              }}
            />
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex justify-between items-center w-full pb-2">
        <div className="tabs border-b-2 border-gray-100 flex items-center gap-4">
          <button
            className={`px-4 py-1 text-lg ${
              activeTab === 'applied'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('applied')}
          >
            Đã ứng tuyển
          </button>
          <button
            className={`px-4 py-1 text-lg ${
              activeTab === 'approved'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('approved')}
          >
            Đã duyệt
          </button>
        </div>
        <div className='flex items-center gap-2'>
        {activeTab === 'applied' && currentRole._id === post._id && (
          <Button label={'Lọc CV'} onClick={handleRankedCandidates} />
        )}
        <Button label={'Quay lại'} onClick={() => navigate(-1)} />
        </div>
      </div>

      {/* Container */}
      <div className="py-4">
        {activeTab === 'applied' ? (
          <>
            <h2 className="text-lg font-semibold mb-4">
              Danh sách ứng tuyển{' '}
              <span className="text-primary">({appliedCandidates.length})</span>
            </h2>
            <div>
              <CandidateApplied
                candidates={appliedCandidates}
                handleApproved={handleApproved}
                post={post}
                hanleViewCV={hanleViewCV}
              />
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-4">
              Danh sách đã duyệt{' '}
              <span className="text-primary">
                ({approvedCandidates.length})
              </span>
            </h2>
            <div>
              <CandidateApproved
                candidates={approvedCandidates}
                hanleViewCV={hanleViewCV}
                owner={owner}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ManagePostApplied
