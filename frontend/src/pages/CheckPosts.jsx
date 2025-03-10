import React, { useEffect, useState } from 'react'
import { getAllPosted } from '../redux/api/post'
import { Post } from '../components'
import { useSelector } from 'react-redux'
import FilterRowBar from '../components/FilterRowBar'
import BasicPagination from '../components/BasicPagination'

const CheckPosts = () => {
  const { currentUser } = useSelector((state) => state.auth)
  const [posts, setPosts] = useState([])
  const [filterPosts, setFilterPosts] = useState()
  const [manage, setManage] = useState({})

  const [currentPage, setCurrentPage] = useState(1) // Thêm state cho trang hiện tại
  const [postsPerPage] = useState(5) // Số bài post mỗi trang
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
    const res = await getAllPosted()
    setPosts(res)
    setFilterPosts(res)
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
    if (currentUser.role === 'admin') {
      setManage({
        remove: true,
        confirm: true,
        view: true
      })
    } else {
      setManage({})
    }
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
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filterPosts?.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(filterPosts?.length / postsPerPage)
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full">
      <FilterRowBar
        title={'Tin chờ duyệt'}
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

export default CheckPosts
