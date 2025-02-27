import React, { useEffect, useState } from 'react'
import {  getListPostByCandidateId } from '../redux/api/post'
import { Post } from '../components'
import { useSelector } from 'react-redux'
import FilterRowBar from '../components/FilterRowBar'
import BasicPagination from '../components/BasicPagination'

const AppliedPosts = () => {
  const { currentUser } = useSelector((state) => state.auth)
  const { currentRole } = useSelector((state) => state.app)
  const [posts, setPosts] = useState([])
  const [filterPosts, setFilterPosts] = useState([])
  const [manage, setManage] = useState({})
  const [currentPage, setCurrentPage] = useState(1); // Thêm state cho trang hiện tại
    const [postsPerPage] = useState(5); // Số bài post mỗi trang
  const [selected, setSelected] = useState()
  const [filter, setFilter] = useState([
    {
      label: 'Theo ngày đăng',
      increase: true,
      active: true
    },
    {
      label: 'Theo lương',
      increase: true,
      active: false
    },
    {
      label: 'Theo lượt xem',
      increase: true,
      active: false
    },
    {
      label: 'Theo lượt ứng tuyển',
      increase: true,
      active: false
    }
  ])

  const getPosteds = async () => {
    const res = await getListPostByCandidateId(currentRole._id, "applied_jobs")
    setPosts(res)
  }

  const handleFilterClick = (index) => {
    setFilter((prevFilter) =>
      prevFilter.map((item, i) =>
        i === index
          ? { ...item, increase: !item.increase, active: true }
          : { ...item, active: false }
      )
    )
  }

  useEffect(() => {
    const rolePermissions = {
      admin: { remove: true, view: true },
      recruiter: { remove: true, view: true },
      default: {}
    }

    let manage = rolePermissions[currentUser.role] || rolePermissions.default
    if (currentUser?._id === currentRole?.userId) {
      manage = { ...manage, view: true }
    }
    setManage(manage)
  }, [currentUser.role])

  useEffect(() => {
    getPosteds()
  }, [filterPosts])

  useEffect(() => {
    const activeFilter = filter.find((f) => f.active)
    if (activeFilter) {
      const sortedPosts = [...posts].sort((a, b) => {
        const sortOrder = activeFilter.increase ? 1 : -1
        switch (activeFilter.label) {
          case 'Theo ngày đăng':
            return (
              sortOrder * (new Date(a.date_upload) - new Date(b.date_upload))
            )
          case 'Theo lương':
            return sortOrder * (a.salary - b.salary)
          case 'Theo lượt xem':
            return sortOrder * (a.views - b.views)
          case 'Theo lượt ứng tuyển':
            return sortOrder * (a.applied.length - b.applied.length)
          default:
            return 0
        }
      })
      setFilterPosts(sortedPosts)
    }
  }, [filter, posts])

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filterPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filterPosts.length / postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full">
      <FilterRowBar
        title={'Tin đã duyệt'}
        filter={filter}
        onChange={handleFilterClick}
      />
      <div className="grid grid-cols-5 gap-4">
        {currentPosts?.map((post) => (
          <Post key={post._id} post={post} manage={manage} />
        ))}
      </div>

      {totalPages > 1 && (
        <BasicPagination
          length={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default AppliedPosts
