import React, { useEffect, useState } from 'react'
import { getAllPosted } from '../redux/api/post'
import { Post } from '../components'
import { useSelector } from 'react-redux'

const CheckPosts = () => {
  const { currentUser } = useSelector((state) => state.auth)
  const [posts, setPosts] = useState()
  const [manage, setManage] = useState({})

  const getPosteds = async () => {
    const res = await getAllPosted()
    setPosts(res)
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

  return (
    <div className="grid grid-cols-5 gap-4">
      {posts?.map((post) => (
        <div>
          <Post post={post} manage={manage} />
        </div>
      ))}
    </div>
  )
}

export default CheckPosts
