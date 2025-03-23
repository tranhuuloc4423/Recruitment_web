import React, { useEffect, useState, useMemo } from 'react'
import { getAllPostConfirmed, getAllPostConfirmedRole } from '../redux/api/post'
import { Post } from '../components'
import { useSelector } from 'react-redux'
import FilterRowBar from '../components/FilterRowBar'
import BasicPagination from '../components/BasicPagination'

const ConfirmedPosts = () => {
  const { currentUser } = useSelector((state) => state.auth)
  const { currentRole } = useSelector((state) => state.app)
  const [posts, setPosts] = useState([])
  const [filterPosts, setFilterPosts] = useState([])
  const [manage, setManage] = useState({})
  const [currentPage, setCurrentPage] = useState(1) // Current page state
  const [postsPerPage] = useState(5) // Posts per page
  const [selected, setSelected] = useState()
  const [searchQuery, setSearchQuery] = useState('') // New search query state

  const [filter, setFilter] = useState([
    { label: 'Theo ngày đăng', increase: true, active: true },
    { label: 'Theo lương', increase: true, active: false },
    { label: 'Theo lượt xem', increase: true, active: false },
    { label: 'Theo lượt ứng tuyển', increase: true, active: false }
  ])
  const [pages, setPages] = useState(0)

  // Fetch posts based on role
  const getPosteds = async () => {
    const res = await getAllPostConfirmedRole(currentRole._id, currentUser.role)
    setPosts(res)
    setPages(res?.length / 10)
  }

  // Handle filter (sorting) click
  const handleFilterClick = (index) => {
    setFilter((prevFilter) =>
      prevFilter.map((item, i) =>
        i === index
          ? { ...item, increase: !item.increase, active: true }
          : { ...item, active: false }
      )
    )
  }

  // Set role-based permissions
  useEffect(() => {
    const rolePermissions = {
      admin: { remove: true, view: true },
      recruiter: { remove: true, view: true },
      default: {}
    }
    let manage = rolePermissions[currentUser.role] || rolePermissions.default
    if (currentUser?._id === currentRole?.userId) {
      manage = { ...manage, update: true }
    }
    setManage(manage)
  }, [currentUser.role])

  // Fetch posts on mount
  useEffect(() => {
    getPosteds()
  }, [])

  // Apply sorting to posts
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

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

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

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = searchedPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(searchedPosts.length / postsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="w-full">
      <div className="flex flex-col flex-start lg:flex-row items-center">
        <FilterRowBar
          title={'Tin đã duyệt'}
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
      {/* Existing FilterRowBar for sorting */}

      {/* Posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentPosts?.map((post) => (
          <Post key={post._id} post={post} manage={manage} />
        ))}
      </div>

      {/* Pagination */}
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

export default ConfirmedPosts
