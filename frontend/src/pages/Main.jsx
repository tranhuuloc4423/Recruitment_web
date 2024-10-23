import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import {
  PostDetails,
  Input,
  Button,
  Tag,
  Post,
  FilterFrame
} from '../components'
import Recruiter from '../pages/Recruiter'
import { getAllPost } from '../redux/api/post'
import { useNavigate } from 'react-router-dom'
const Main = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [suggess, setsuggess] = useState([
    {
      value: 'reactjs',
      label: 'ReactJS'
    },
    {
      value: 'java',
      label: 'Java'
    },
    {
      value: 'html',
      label: 'HTML'
    }
  ])
  const [selectedPost, setSelectedPost] = useState(posts[0]?._id)
  const [search, setSearch] = useState('')

  const getPosts = async () => {
    const data = await getAllPost()
    setPosts(data)
  }

  const handlePostClick = (id) => {
    setSelectedPost(id)
  }

  useEffect(() => {
    getPosts()
  }, [])

  useEffect(() => {
    if (posts && posts.length > 0) {
      setSelectedPost(posts[0])
    }
  }, [posts])

  return (
    <div className="flex flex-col gap-4 justify-center items-center mx-auto">
      <div className="w-2/3 flex flex-col gap-2">
        {/* Search */}
        <div className="flex flex-row gap-4 w-full items-center">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm theo từ khoá"
          />
          <Button
            label={'Tìm kiếm'}
            onClick={() => {}}
            icon={<FiSearch size={24} color="white" />}
            iconPosition="left"
            className="px-8"
          />
        </div>

        {/* suggestion */}
        <div className="flex flex-row items-center gap-2">
          <span>Gợi ý cho bạn : </span>
          <div className="flex flex-row gap-2">
            {suggess?.map((tag) => (
              <Tag key={tag.value} label={tag.label} />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 justify-between">
        <div className="flex flex-row justify-between items-center">
          <span className="heading-3">{44} công việc đã được tìm thấy</span>
          <span>
            <FilterFrame />
          </span>
        </div>
        <div className="flex flex-row gap-4">
          <div className="w-1/3 flex flex-col gap-2 overflow-y-auto">
            {posts?.map((post, index) => (
              <div
                key={index}
                onClick={() => handlePostClick(post._id)}
                className="cursor-pointer"
              >
                <Post post={post} select={selectedPost} />
              </div>
            ))}
          </div>
          <div className="w-2/3">
            <PostDetails id={selectedPost} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
