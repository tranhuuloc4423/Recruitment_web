import React, { useEffect, useState } from 'react'
import { getAllPostConfirmed } from '../redux/api/post'
import { Post } from '../components'
import { useSelector } from 'react-redux'
import FilterRowBar from '../components/FilterRowBar'

const ConfirmedPosts = () => {
  const { currentUser } = useSelector((state) => state.auth)
  const [posts, setPosts] = useState([])
  const [manage, setManage] = useState({})

  const getPosteds = async () => {
    const res = await getAllPostConfirmed()
    setPosts(res)
  }
  useEffect(() => {
    if (currentUser.role === 'admin') {
      setManage({
        remove: true,
        confirm: true
      })
    } else {
      setManage({})
    }
  }, [currentUser.role])

  useEffect(() => {
    getPosteds()
  }, [])

  return (
    <div className="w-full">
      <FilterRowBar title={'Tin đã duyệt'} />
      <div className="grid grid-cols-5 gap-4">
        {posts?.map((post) => (
          <div>
            <Post post={post} manage={manage} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ConfirmedPosts
