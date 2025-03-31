import React, { useEffect, useMemo, useState } from 'react'
import {  getListPostByCandidateId } from '../redux/api/post'
import { Post } from '../components'
import { useSelector } from 'react-redux'
import FilterRowBar from '../components/FilterRowBar'
import BasicPagination from '../components/BasicPagination'

const SavedPosts = () => {
  const { currentUser } = useSelector((state) => state.auth)
  const { currentRole } = useSelector((state) => state.app)
  const [posts, setPosts] = useState([])
  const [filterPosts, setFilterPosts] = useState([])
  const [manage, setManage] = useState({})
  const [currentPage, setCurrentPage] = useState(1); // Thêm state cho trang hiện tại
    const [postsPerPage] = useState(5); // Số bài post mỗi trang
  const [selected, setSelected] = useState()
    const [searchQuery, setSearchQuery] = useState('') // New search query state
  
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
    const res = await getListPostByCandidateId(currentRole._id, "saved_jobs")
    setPosts(res)
    console.log(res)
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
    }, [])
  
    useEffect(() => {
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

  const searchedPosts = useMemo(() => {
      if (!searchQuery) return filterPosts
      const lowerQuery = searchQuery.toLowerCase()
  
      return filterPosts.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(lowerQuery)
  
        const skillsMatch = post.skills.some((skill) =>
          skill.name.toLowerCase().includes(lowerQuery)
        )
  
        const locationMatch = post.location.address.some(
          (addr) =>
            addr.province.name.toLowerCase().includes(lowerQuery) ||
            addr.district.name.toLowerCase().includes(lowerQuery)
        )
  
        return titleMatch || skillsMatch || locationMatch
      })
    }, [filterPosts, searchQuery])

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(searchedPosts.length / postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col flex-start lg:flex-row items-center">
        <FilterRowBar
          title={'Tin đã lưu'}
          filter={filter}
          onChange={handleFilterClick}
        />
        <input
          type="text"
          placeholder="Tìm kiếm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border outline-second border-gray-300 rounded"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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

export default SavedPosts
