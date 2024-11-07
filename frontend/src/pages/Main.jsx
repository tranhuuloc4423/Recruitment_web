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
import { getAllPostConfirmed } from '../redux/api/post'
const Main = () => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [jobs, setJobs] = useState()
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
    const data = await getAllPostConfirmed()
    setPosts(data)
    setFilteredPosts(data)
  }

  // const handleSearch = () => {
  //   console.log(search)
  //   const searchTerm = search?.toLowerCase()
  //   console.log(posts)
  //   const filtered = posts?.filter(
  //     (post) =>
  //       post?.title?.toLowerCase().includes(searchTerm) ||
  //       post?.skills?.some((skill) =>
  //         skill?.name.toLowerCase().includes(searchTerm)
  //       ) ||
  //       post?.location?.address[0]?.province?.name
  //         .toLowerCase()
  //         .includes(searchTerm)
  //   )
  //   setFilteredPosts(filtered)
  // }

  const handleSearch = () => {
    const searchTerm = search.toLowerCase()
    const filtered = posts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(searchTerm)

      const skillsMatch = post.skills?.some((skill) =>
        skill.name?.toLowerCase().includes(searchTerm)
      )

      const locationMatch = post.location?.address?.[0]?.province?.name
        ?.toLowerCase()
        .includes(searchTerm)

      return titleMatch || skillsMatch || locationMatch
    })
    setFilteredPosts(filtered)
    setJobs(filtered.length)
    console.log(filteredPosts)
  }

  const handlePostClick = (id) => {
    setSelectedPost(id)
  }

  useEffect(() => {
    getPosts()
  }, [])

  useEffect(() => {
    if (filteredPosts && filteredPosts.length > 0) {
      setSelectedPost(filteredPosts[0]._id)
      setJobs(filteredPosts.length)
    }
  }, [filteredPosts])

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
            onClick={handleSearch}
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
              <div
                key={tag.value}
                onClick={() => setSearch(tag.label)}
                className="cursor-pointer"
              >
                <Tag label={tag.label} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 justify-between">
        <div className="flex flex-row justify-between items-center">
          <span className="heading-3">
            <span className="text-primary font-semibold text-4xl">{jobs}</span>{' '}
            công việc đã được tìm thấy
          </span>
          <span>
            <FilterFrame />
          </span>
        </div>
        <div className="flex flex-row gap-4 ">
          <div className="w-1/3 flex flex-col gap-2 h-[1000px] overflow-y-auto">
            {filteredPosts?.map((post, index) => (
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
