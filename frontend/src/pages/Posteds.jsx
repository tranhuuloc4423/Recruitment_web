import React, { useEffect, useState } from 'react'
import {
  getAllPosted,
  getAllPostedByOwner,
  getAllPostedRole
} from '../redux/api/post'
import { Post } from '../components'
import FilterRowBar from '../components/FilterRowBar'
import { useSelector } from 'react-redux'
import BasicPagination from '../components/BasicPagination'

const Posteds = () => {
  const { currentUser } = useSelector((state) => state.auth)
  const { currentRole } = useSelector((state) => state.app)
  const [posts, setPosts] = useState([])
  const [filterPosts, setFilterPosts] = useState([])
  const [manage, setManage] = useState({})
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
  const [pages, setPages] = useState(0)

  const getPosteds = async () => {
    // const res = await getAllPosted()
    const res = await getAllPostedByOwner(currentRole._id)
    setPosts(res)
    setPages(res?.length / 10)
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
      recruiter: { remove: true, view: true, update: true },
      default: {}
    }

    let manage = rolePermissions[currentUser.role] || rolePermissions.default

    if (currentUser?._id === currentRole?.userId) {
      manage = { ...manage, update: true }
    }
    setManage(manage)
  }, [currentUser.role])

  useEffect(() => {
    getPosteds()
  }, [])

  useEffect(() => {
    const activeFilter = filter.find((f) => f.active)
    if (activeFilter && posts) {
      const sortedPosts = [...posts]?.sort((a, b) => {
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

  return (
    <div className="w-full">
      <FilterRowBar
        title={'Tin đã đăng'}
        filter={filter}
        onChange={handleFilterClick}
      />
      <div className="grid grid-cols-5 gap-4">
        {filterPosts?.map((post, index) => (
          <Post key={post._id} post={post} manage={manage} />
        ))}
      </div>
      {pages > 1 && <BasicPagination length={pages} />}
    </div>
  )
}

export default Posteds
